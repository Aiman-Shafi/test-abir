module.exports = {
  async up(db, client) {
    const session = client.startSession();
    const userDoc = db.collection('users');
    const investmentDoc = db.collection('investments');
    const investmentIds = ["IN_pCzzKn4RwXhCjFUd","IN_mPnzmxeCGB6KxJdf","IN_x3EkNjtT3ZTkfex7","IN_GEHgdJ3dyhYDgXzp","IN_zcXDMXmTc3hzEFWF","IN_KNMXNGJLVj8hyFiF","IN_qpWPB3y4WkMMcxqe","IN_dmjEmULeVPExrL3a","IN_9QhCrH33ibyAmTrV","IN_Bk8rhdRLjh2LRUN4","IN_x2VqpJjwAFdKCUcq","IN_aqfqLKbpHRVabM8i","IN_jWTiKeLkxKW4TwmX","IN_7WXmCcLYJwtRUwGm","IN_Bzq9eXLR4KEYbHUZ","IN_BWCK8NQKmaQ7gKHi","IN_R7Twk9zpHZ9JYTUY","IN_PeL8ZmY26TfxGEQ9","IN_ARyA2mE8tLxefMXJ","IN_qLNxmq4E9BMi9Kg9","IN_tWwcMxZhmyUVXVzU","IN_DBnBQULMrLVLmWgh","IN_YnDhgAXLWg3eVBKn","IN_3yZmPMbiqYxF2mV6","IN_aPEb8qiWeXKCArUT","IN_rHiadzXLyq8zbKHg","IN_ptPcDfRbQXpbmQG8"]
    const userIds = ["46aLkFzd6bfTEMLNdRu","riMKHcYkidEzNVrezaz","Y2rjPH3YXE3WzF7bk4h","DJAdAW3QTCfkLnk2c9E","zjEt3QkH4ZJwd68PGpU","eHMMcrBwVGAam3mPNqz","dyNR78cbBYVpLBZELxc","yWmkmUbH2Zb0rn8JU97","jZBztczEReArmahmtbh","hzx2QdQedOzJDJDHyWN","m3YHP4jjML2RTDQjK3L","wd2cJHKShNecwHtbRRD","ZRcNLrXHG6PqJbrHXQT","PeU3RpH2x2idTBqFZZ2","HeJyAC6k99rXRibfbCP","pKfVcA8NkiRVTrxV8Pj","jTlBqU7zTm3ybF6tExr","yi8DaMZCnhUGMKP9N8R","s8m9Z7JNz6BpkbfzVVH","Mm8mLFFRUGAFrGWiD8q","zRCaZYkQe8RYMrAqzNA","E7KpP4QrGKWttapaeQB","VxLQDYDyRcF6neZjTr4","rRNfbLbzTAdaGmwaTpq","Z2yVBfgneBf4wyfFg8N"]
    const companyIds = ["9l35CXSeAQcFTFW2n7m","B9azlsjPeqaUqEuFoNf","JhSRWScijwPFXNxnmTp","Q5e187MaqokoUyBvAr0","m2KbdRAmv4rdGEPMTFG","lguLuVNdGmwowICJSUw"]
    try {
      await session.withTransaction(async () => {
        var ctr = 0;
        for (var userCnt = 0; userCnt < userIds.length; userCnt++) {
          const investmentCount = userCnt % 3
          if (investmentCount > 0) {
            var investments = []
            for (var i=0; i<investmentCount; i++) {
              const investment = {
                investmentId: investmentIds[ctr++],
                userId: userIds[userCnt],
                companyId: companyIds[ctr % companyIds.length],
                amount: 2000,
                shareCount: 200
              }
              await investmentDoc.insertOne(investment)
              investments.push(investment)
            }
            const query = {userId: userIds[userCnt]}
            userDoc.updateOne(query, {$set: {investments: investments}})
            console.log(`Added ${investments.length} investments for userId: ${userIds[userCnt]}`)
          }
        }
    });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
