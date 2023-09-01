module.exports = {
  async up(db, client) {
    const session = client.startSession();
    const companyDoc = db.collection('companies');
    const userDoc = db.collection('users');
    const companyIds = ["9l35CXSeAQcFTFW2n7m","B9azlsjPeqaUqEuFoNf","JhSRWScijwPFXNxnmTp","Q5e187MaqokoUyBvAr0","m2KbdRAmv4rdGEPMTFG","lguLuVNdGmwowICJSUw"]
    const bizNames = ["Loader", "Craft AI", "Fuel Stage", "Rubicon", "Luminous", "Continuum"]
    const logos = ["https://randompicturegenerator.com/img/flower-generator/gbc2c6be03c18dc3c2fe57d6b271019f14c0ca9082b0159f42af12c206fbd8eb3699498fd03ea9988f73e991134cb6dcb_640.jpg", "https://randompicturegenerator.com/img/flower-generator/g3ee8b6252b161614b027fd5bd40f20cc23e276001061997d3101bfd4d3144d7cfb774458ec36e77915e47fb8b207bcd1_640.jpg", "https://randomwordgenerator.com/img/picture-generator/55e2d6474950af14f1dc8460962e33791c3ad6e04e507441722872d69049cc_640.jpg", "https://randomwordgenerator.com/img/picture-generator/57e0d1414a5aab14f1dc8460962e33791c3ad6e04e507441722878dc924cc4_640.jpg", "https://randomwordgenerator.com/img/picture-generator/51e9d44b4351b10ff3d8992cc12c30771037dbf85254794e732879dc904d_640.jpg", "https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg"]
    const partners = [
      ["riMKHcYkidEzNVrezaz"],
      ["46aLkFzd6bfTEMLNdRu", "zjEt3QkH4ZJwd68PGpU"],
      ["DJAdAW3QTCfkLnk2c9E", "yWmkmUbH2Zb0rn8JU97", "jZBztczEReArmahmtbh"],
      ["m3YHP4jjML2RTDQjK3L"],
      ["ZRcNLrXHG6PqJbrHXQT", "PeU3RpH2x2idTBqFZZ2"],
      ["yWmkmUbH2Zb0rn8JU97", "s8m9Z7JNz6BpkbfzVVH"]
    ]
    const domains = [".ai", ".io", ".com"]
    const industries = ["Retail", "Tech", "Sales", "Finance", "Fashion", "Outdoors"]
    minimumInvestments = [500.0, 999.0, 2000.0]
    sharesOutstanding = [200, 150, 100]
    locations = ["San Fransisco, Bay Area", "Seattle, WA", "Washington, DC", "New York, NY", "Austin, TX", "Boulder, CO"]
    try {
      await session.withTransaction(async () => {
        var i = 0;
        for (i=0; i<companyIds.length; i++) {
          const website = bizNames[i].split(" ")[0].toLowerCase() + '-noexist' + domains[i % domains.length]
          const bio = `sample bio for ${bizNames[i]} with website: ${website}`
          var industryTags = []
          for (var cnt = 0; cnt < partners[i].length; cnt++) {
            industryTags.push(industries[(i + cnt) % industries.length])
            const query = {userId: partners[i][cnt]}
            var existing = await userDoc.findOne(query)
            if (existing && existing.userId) {
              var companies = existing.companies || []
              companies.push(companyIds[i])
              console.log(`Updating user: ${existing.legalName} as a partner of ${bizNames[i]}`)
              await userDoc.updateOne(query, {$set: {companies: companies}})
            }
          }
          const company = {
            companyId: companyIds[i],
            name: bizNames[i],
            logo: logos[i % logos.length],
            bio: bio,
            partners: partners[i],
            industry: industryTags,
            website: website,
            valuation: 1000000000 * ((i % 3) + 1), // 1, 2 or 3 million dollars
            minimumInvestment: minimumInvestments[i % minimumInvestments.length],
            sharePrice: 10,
            sharesOutstanding: Math.floor(minimumInvestments[i % minimumInvestments.length] * 15), // between 7,500 and 30,000 shares
            location: locations[i]
          }
          console.log(`Adding company ${i+1}:`)
          console.log(`name: ${company.name}, id: ${company.companyId}, website: ${company.website}, location: $ ${company.location}`);
          console.log('###')
          await companyDoc.insertOne(company);
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
