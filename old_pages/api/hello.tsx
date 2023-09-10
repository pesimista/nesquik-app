// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import admin from '../../lib/firesbase-admin'
const firestore = admin.firestore()

export default async function handler(req, res) {
  const initial = new Date('2022-03-01')
  const final = new Date('2022-04-01')

  try {
    // const collection = await firestore
    //   .collection('requests')
    //   .where('status', '==', 5)
    //   .where('createdAt', '>=', initial)
    //   .where('createdAt', '<=', final)
    //   .select('products')
    //   .orderBy('createdAt', 'desc')
    //   .limit(1)
    //   .get()

    const collection = await firestore
      .collection('marketCategories')
      // .doc('oxyswQwrP4KRUGO3BZwX')
      // .where('status', '==', 5)
      // .where('createdAt', '>=', initial)
      // .where('createdAt', '<=', final)
      // .select('products')
      // .orderBy('createdAt', 'desc')
      // .limit(1)
      .get()

    const data = collection.docs.map((item) => item.data())

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
