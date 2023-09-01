module.exports = {
  async up(db, client) {
    const session = client.startSession();
    const userDoc = db.collection('users');
    const userIds = ["46aLkFzd6bfTEMLNdRu","riMKHcYkidEzNVrezaz","Y2rjPH3YXE3WzF7bk4h","DJAdAW3QTCfkLnk2c9E","zjEt3QkH4ZJwd68PGpU","eHMMcrBwVGAam3mPNqz","dyNR78cbBYVpLBZELxc","yWmkmUbH2Zb0rn8JU97","jZBztczEReArmahmtbh","hzx2QdQedOzJDJDHyWN","m3YHP4jjML2RTDQjK3L","wd2cJHKShNecwHtbRRD","ZRcNLrXHG6PqJbrHXQT","PeU3RpH2x2idTBqFZZ2","HeJyAC6k99rXRibfbCP","pKfVcA8NkiRVTrxV8Pj","jTlBqU7zTm3ybF6tExr","yi8DaMZCnhUGMKP9N8R","s8m9Z7JNz6BpkbfzVVH","Mm8mLFFRUGAFrGWiD8q","zRCaZYkQe8RYMrAqzNA","E7KpP4QrGKWttapaeQB","VxLQDYDyRcF6neZjTr4","rRNfbLbzTAdaGmwaTpq","Z2yVBfgneBf4wyfFg8N"]
    try {
      await session.withTransaction(async () => {
        var i = 0;
        for (i=0; i<userIds.length-1; i++) {
          const userId1 = userIds[i];
          var user1 = await userDoc.findOne({userId: userId1})
          for (j=i+1; j<userIds.length; j++) {
            if (Math.floor(Math.random() * 10) % 4 == 1) {
              const userId2 = userIds[j]
              var user2 = await userDoc.findOne({userId: userId2})
              console.log(`### Adding connection: user1: ${userId1}, user2: ${userId2}`)
              user2.connections.push(userId1)
              await userDoc.updateOne({userId : userId2}, {$set: {connections: user2.connections}})

              user1.connections.push(userId2)
            }
          }
          // set default password for each user:
          user1.secret = '$2b$10$qEV4Qxebr9mnAtJJGyONHOaW8cKrBnpg0sr3cxYQZbQzh95WXgYNe'
          await userDoc.updateOne({userId : userId1}, {$set: {connections: user1.connections}})
        }
    });
    } finally {
      await session.endSession();
    }
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
