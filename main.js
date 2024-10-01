const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const { fakerJA } = require('@faker-js/faker');

const { productNames } = require('./constants/product');
const { sequelize } = require('./services/sequelize');
const { User, Product, Estimate, EstimateDetail, Order, OrderDetail } = require('./models');
const { getRandomDateWithinLastMonth, getCurrentFormattedDate, createDirectory } = require('./utilities');

async function main() {
  const faker = fakerJA;

  try {
    await sequelize.sync({ force: true });

    // NOTE: ユーザーの作成 10人
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(await User.create({
        username: faker.person.lastName() + ' ' + faker.person.firstName(),
        birthday: faker.date.past(30, new Date(2000, 0, 1))
      }));
    }

    // NOTE: 商品の作成 20個（ホームセンターの商品）
    const products = [];
    for (let i = 0; i < productNames.length; i++) {
      products.push(await Product.create({
        name: productNames[i],
        unitPrice: faker.commerce.price(500, 5000, 0)
      }));
    }

    // NOTE: 見積もりの作成 10件、各明細は3から10件
    const estimates = [];
    for (let i = 0; i < 10; i++) {
      const estimate = await Estimate.create({
        userId: users[Math.floor(Math.random() * users.length)].id,
        status: 'pending',
        createdAt: getRandomDateWithinLastMonth()
      });
      estimates.push(estimate);

      const detailsCount = Math.floor(Math.random() * 8) + 3; // 3〜10明細
      for (let j = 0; j < detailsCount; j++) {
        await EstimateDetail.create({
          estimateId: estimate.id,
          detailNumber: j + 1,
          productId: products[Math.floor(Math.random() * products.length)].id,
          quantity: Math.floor(Math.random() * 10) + 1
        });
      }
    }

    // NOTE: 注文の作成 10件、各明細は3から10件
    const orders = [];
    for (let i = 0; i < 10; i++) {
      const order = await Order.create({
        userId: users[Math.floor(Math.random() * users.length)].id,
        status: 'pending',
        createdAt: getRandomDateWithinLastMonth()
      });
      orders.push(order);

      const detailsCount = Math.floor(Math.random() * 8) + 3; // 3〜10明細
      for (let j = 0; j < detailsCount; j++) {
        await OrderDetail.create({
          orderId: order.id,
          detailNumber: j + 1,
          productId: products[Math.floor(Math.random() * products.length)].id,
          quantity: Math.floor(Math.random() * 10) + 1
        });
      }
    }

    // NOTE: 見積の状態の変更
    await Estimate.update(
      {
        status: 'confirmed',
        updatedAt: new Date()
      },
      { where: { id: { [Op.lt]: 5 } } } // 最初の5件の見積を確定
    );

    // NOTE: 注文の状態の変更
    await Order.update(
      {
        status: 'confirmed',
        updatedAt: new Date()
      },
      { where: { id: { [Op.lt]: 5 } } } // 最初の5件の注文を確定
    );

    // NOTE: 見積を参照した注文の作成 3件
    for (let i = 0; i < 3; i++) {
      const estimate = estimates[Math.floor(Math.random() * estimates.length)];
      const order = await Order.create({
        userId: estimate.userId,
        status: 'pending',
        createdAt: getRandomDateWithinLastMonth()
      });

      const estimateDetails = await EstimateDetail.findAll({ where: { estimateId: estimate.id } });
      for (let j = 0; j < estimateDetails.length; j++) {
        const detail = estimateDetails[j];
        await OrderDetail.create({
          orderId: order.id,
          detailNumber: j + 1,
          productId: detail.productId,
          quantity: detail.quantity,
          estimateId: detail.estimateId,
          estimateDetailNumber: detail.detailNumber
        });
      }
    }

    // NOTE: 見積の現在の状態をJSONで書き出す
    const currentEstimates = await Estimate.findAll({
      include: [{ model: EstimateDetail, include: [Product] }],
      raw: false
    });

    // NOTE: 注文の現在の状態をJSONで書き出す
    const currentOrders = await Order.findAll({
      include: [{
        model: OrderDetail,
        include: [
          Product,
          EstimateDetail
        ]
      }],
      raw: false
    });

    // 現在の日時を取得してフォルダを作成
    const timestamp = getCurrentFormattedDate();
    const outputDir = path.join(__dirname, 'out', timestamp);
    createDirectory(outputDir);

    // 見積のJSONをファイルに保存
    const estimatesJsonPath = path.join(outputDir, 'estimation.json');
    fs.writeFileSync(estimatesJsonPath, JSON.stringify(currentEstimates, null, 2));

    // 注文のJSONをファイルに保存
    const ordersJsonPath = path.join(outputDir, 'orders.json');
    fs.writeFileSync(ordersJsonPath, JSON.stringify(currentOrders, null, 2));

    console.log('見積と注文のデータが保存されました:', estimatesJsonPath, ordersJsonPath);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
