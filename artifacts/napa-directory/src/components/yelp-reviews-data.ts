export interface YelpReview {
  author: string;
  rating: number;
  date: string;
  text: string;
  source?: "yelp" | "tripadvisor" | "google";
}

export const YELP_REVIEWS: Record<string, YelpReview[]> = {
  "castello-di-amorosa": [
    { author: "Ki L.", rating: 5, date: "Feb 2026", source: "yelp", text: "Castello di Amorosa is one of those places that reminds you Napa can still feel magical. The property itself is stunning. Walking through the stone tunnels, seeing the aging barrels, and looking out over the vineyard — it's unlike anything else in wine country." },
    { author: "Yelp Visitor", rating: 5, date: "2026", source: "yelp", text: "Castello di Amorosa is such a beautiful and unique experience! The castle itself is stunning — you really feel like you've stepped into another world." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "I am very grateful how welcoming Castello di Amorosa was with my group of 15 girls because it's hard to accommodate such a large party. The tour is one of the best in Napa." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "This winery is truly special and the tour is one I'd recommend to anyone visiting Napa. The castle is authentic, the wines are exceptional, and the whole experience is unforgettable." },
  ],

  "trefethen-family-vineyards": [
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Shannon was a complete joy to have wine served from and she is very knowledgeable about the Trefethen wines. The drive into the vineyards was beautiful since the grape leaves were turning orange-red." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "The wines were incredible, impressive, expressive Cabernet Sauvignon — think single vineyard, 100%. Vineyard views were stunning and the property was nicely maintained. Our server was exceptional." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "We made reservations at Trefethen Family Vineyards and it was such a great time. Beautiful property, wonderful staff, and the wines were exceptional across the board." },
    { author: "Yelp Visitor", rating: 4, date: "2024", source: "yelp", text: "One of Napa's great historic estates. The Chardonnay and Riesling are outstanding. Dogs are welcomed graciously on the spacious grounds. A refined, unhurried experience every time." },
  ],

  "jessup-cellars": [
    { author: "Natalie H", rating: 5, date: "May 2025", source: "tripadvisor", text: "Stopped by without a reservation and the hostess found us a spot. Such a flexible and friendly tasting room. We discovered lots of new favorites and decided to join their wine club that day!" },
    { author: "SHLtraveler", rating: 5, date: "Feb 2025", source: "tripadvisor", text: "Excellent experience — great tasting with a dedicated wine expert. The tasting room at Jessup Cellars in Yountville is a real gem. The atmosphere and vibe here are wonderful." },
    { author: "vkk d", rating: 5, date: "Oct 2024", source: "tripadvisor", text: "One of the best experiences in wine country. Jessup Cellars has been a favorite for over a decade — every visit is consistently excellent. The wines and the art gallery inside are both outstanding." },
    { author: "Michael M", rating: 5, date: "Aug 2024", source: "tripadvisor", text: "Very pleasant tasting room! Excellent wines in a lovely setting with knowledgeable staff and a fun atmosphere. We truly appreciated the warmth and flexibility of the whole team." },
  ],

  "tamber-bey-vineyards": [
    { author: "yelenyt", rating: 5, date: "Sep 2025", source: "tripadvisor", text: "Our favorite stop on our trip! Visited after reading TripAdvisor reviews and it completely exceeded expectations. The equestrian setting is truly one-of-a-kind and the wines are exceptional." },
    { author: "ShannonLeighLa", rating: 4, date: "Dec 2024", source: "tripadvisor", text: "Cheers — to a beautiful experience! Peaceful and relaxing visit. The grounds and the horses are gorgeous. The wines are excellent and the setting is unlike any other winery in Napa." },
    { author: "eale1234", rating: 5, date: "Sep 2023", source: "tripadvisor", text: "Another amazing visit with Cher. As a long-time wine club member I continue to be impressed each visit. Cher is so fun and full of great information about the wines and Napa. Will return every trip." },
    { author: "cyndirn2", rating: 5, date: "2023", source: "tripadvisor", text: "One of the best wineries to visit in Napa. Barry, Jennifer, and Cher make every visit feel personal and special. The equestrian atmosphere with the horses in the background is absolutely magical." },
  ],

  "tres-sabores": [
    { author: "Andrea M.", rating: 5, date: "Apr 2025", source: "yelp", text: "Out of several stops that day in Napa, Tres Sabores was my favorite. It felt authentic, relaxed, and genuinely special. The wines were fantastic — vibrant, expressive, and clearly crafted with care. I would return in a heartbeat." },
    { author: "Yelp Visitor", rating: 5, date: "Jan 2026", source: "yelp", text: "Enjoyed learning the history of this winery. The service and attention to detail was outstanding. The tastings were great! Ordered almost every bottle!" },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "I love that Tres Sabores is organic. The staff are wonderful and the wines are unlike anything else in Napa. The ¿Por Qué No? blend is a true standout." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "What a fantastic hidden gem. The wines are fantastic and the staff a real delight. Dogs are welcome on the beautiful organic property. A must-visit in Rutherford." },
  ],

  "etude-wines": [
    { author: "Yelp Visitor", rating: 5, date: "Apr 2026", source: "yelp", text: "Property is beautiful. Staff is wonderful. Thank you David and Sylvia for an amazing experience here at Etude." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "David was the perfect host and balanced education with relaxation. David made our visit truly special and it was our favorite tasting of the trip. Shortly after arriving home, I found a handwritten thank you note from David — truly exceptional service." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "What a beautiful setting with delicious wine and very friendly and knowledgeable service. The Pinot Noir is outstanding and the property is gorgeous." },
    { author: "Yelp Visitor", rating: 4, date: "Dec 2025", source: "yelp", text: "This was my first winery tour in Napa Valley. The wines were impressive, especially the Pinot Noir. The setting is beautiful and peaceful. A great introduction to Napa." },
  ],

  "hall-wines": [
    { author: "Katherine P.", rating: 5, date: "2025", source: "yelp", text: "We always have a great experience when we visit Hall — the service is unparalleled to any other winery in the valley. Joego and Ray were wonderful hosts. The Knights Valley Sauvignon Blanc and the Diamond Mountain Cab are outstanding." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "We thoroughly enjoyed our wine tasting at Hall. Ron, our educator, was knowledgeable and personable. After visiting two other wineries, we agreed Hall has the best wines in the valley." },
    { author: "Yelp Visitor", rating: 5, date: "May 2026", source: "yelp", text: "Hall Winery in St. Helena blends great wine and a beautiful setting all in one place. From the moment you arrive, the property stands out. The wines were bold, polished, and clearly crafted with attention to detail." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "They do not serve food — this is a wine experience. The team is amazing and very attentive. The outdoor sculpture garden is an incredible experience, especially with your dog." },
  ],

  "frogs-leap-winery": [
    { author: "Helena D.", rating: 5, date: "Oct 2025", source: "tripadvisor", text: "Lucinda was our tour guide for the Rooted in Rutherford experience and she was phenomenal. Would highly recommend to all those who want an elegant and relaxed experience with incredible tastings." },
    { author: "Cara — Franklin, TN", rating: 4, date: "Oct 2025", source: "tripadvisor", text: "This winery is very cute and we had a lovely porch tasting. The scenery was nice and we were able to walk around the property. The wines were pretty good. A charming Rutherford stop." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Wine is great! Small selection. Reservation needed. Definitely not rushed! The personalized greeting was super cute! The farm atmosphere is so charming and our dog was completely welcome." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "We really enjoyed coming to Frog's Leap! We had our dogs with us so did the garden tasting which was perfect. Great Sauvignon Blanc and the organic farm setting is genuinely special." },
  ],

  "pine-ridge-vineyards": [
    { author: "aileenmcdonnell1", rating: 5, date: "2025", source: "tripadvisor", text: "Pine Ridge Release Party — as a wine club member for over 25 years who visits multiple times a year, this winery never disappoints. The cave experience and the Stags Leap Cabernet are world-class." },
    { author: "Edmund", rating: 5, date: "2024", source: "tripadvisor", text: "Pine Ridge hosted us on a Monday with excellent Cabernets from across Napa Valley. Our tasting was led by Nancy who was highly knowledgeable and made the cave experience truly memorable. Reservation required and absolutely worth it." },
    { author: "Catherine", rating: 5, date: "2024", source: "tripadvisor", text: "Great tour for anyone — our guide Steve carefully selected snack pairings that complemented each wine beautifully. The tasting room is stunning and the cave passageways are unforgettable. Highly recommend." },
    { author: "Patinca29", rating: 5, date: "2024", source: "tripadvisor", text: "A wine country newbie, Pine Ridge by far made this trip for me! My friends and I made a last-minute day trip to Napa and Pine Ridge welcomed us with open arms. The cave tasting was extraordinary and the Stags Leap Cabernet is exceptional." },
  ],

  "honig-vineyard-winery": [
    { author: "Jiliane Russo", rating: 5, date: "Feb 2025", source: "yelp", text: "We are wine members of Honig and have loved coming here with our friends in town, relatives from the east coast, as well as with our son. The wine membership is reasonable and the vineyard itself is both classy while also being child and dog friendly. Cannot recommend it enough. Shout out especially to Rapha and Laurie for their hospitality and professionalism." },
    { author: "Yelp Visitor", rating: 5, date: "Dec 2024", source: "yelp", text: "Connected with Ron Young, the wine host. Outstanding service and knowledge. My wife and I will return soon and join as members. The wine is exceptional and the environment, views, and feel is in the top 5 wineries we've visited." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "We had such an amazing time here. Edgar was our host for the wine tasting and he made the experience even more fascinating. The Sauvignon Blanc and Cabernet are both outstanding." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Love the wines here! The service was great, I felt very educated afterwards and the place is dog friendly. The Cab is wonderful and the setting in Rutherford is beautiful." },
  ],

  "charles-krug-winery": [
    { author: "Hanna H.", rating: 5, date: "Feb 2024", source: "google", text: "What a great experience! During our stay in Napa, this was our favorite place. Kris was very helpful and a great host — patiently answering all our questions and gave us a great tour of the estate. The food and wine pairing was absolutely delicious! We did not expect such good food but we were blown away!" },
    { author: "Dan D.", rating: 5, date: "Jun 2025", source: "google", text: "Although we are already long time members, the staff treated us well. We tasted varietals and vintages on the list which were quite good." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Excellent service. Robert was attentive, funny and knowledgeable. We loved the pizza and the wines. This is our second time at this winery and we'll continue to come every time we're in Napa." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Great experience and fabulous wines. We became wine club members and came back for another tasting. Our favorite Napa winery. Staff is amazing and really takes the time to make you feel welcome." },
  ],

  "tank-garage-winery": [
    { author: "Christine — Vacaville, CA", rating: 5, date: "Jan 2025", source: "yelp", text: "This was our first time visiting Tank Garage Winery — Connery made our experience amazing!" },
    { author: "Jackie", rating: 5, date: "2025", source: "yelp", text: "Tank Garage was a breath of fresh air in the midst of so many wineries to choose from. My bestie and I had made reservations here and were so glad we did! The tasting room is a darling old vintage gas station and the service was beyond wonderful. Bailey was so great and we felt like she definitely spoiled us with our tasting." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Connery lead us through the tasting and blew us away with his knowledge and patience while we asked a million questions. All the wines were fantastic and perfectly balanced. Our favorites were Pink's Not Dead (a perfectly balanced rosé) and Strut." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Wonderful experience that truly separates itself from the typical winery tasting. Beautiful artwork, fantastic wine selections, and an incredibly welcoming staff. Our dog got lots of love from the whole team." },
  ],

  "bouchaine-vineyards": [
    { author: "Yelp Visitor", rating: 5, date: "Jun 2025", source: "yelp", text: "We reserved a Terrace Tasting hosted by Marija. The terrace is the perfect place to taste their wonderful selections of wine. Pair that with Marija's European charm and vast wine and food knowledge and it was worth every visit. We would not have our Napa stay complete without seeing Bouchaine and Marija." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Phenomenal experience. This was our first time in Napa ever and Gigi was fantastic at guiding us through the tasting experience. The whole team was very welcoming and we had a wonderful tasting experience on the terrace." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Bouchaine Vineyards exceeded every expectation. The views over the Carneros hills are absolutely stunning, and the tasting patio has one of the best atmospheres in Napa — relaxed, elegant, and never overcrowded." },
    { author: "Yelp Visitor", rating: 4, date: "2024", source: "yelp", text: "The view is gorgeous! We relaxed on their terrace where you can observe the remarkable beauty of Carneros. The Pinot Noir is outstanding and dogs are genuinely welcome throughout." },
  ],

  "chandon-california": [
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Benji was an absolutely fantastic host and the food was right on point! We brought a group of 23 to Napa and Chandon handled everything perfectly. The sparkling wines are exceptional." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "My wife and I are members here, due to two reasons: The bubbly is awesome, and Susan is a fantastic credit to the team. We come back every chance we get." },
    { author: "Yelp Visitor", rating: 4, date: "2025", source: "yelp", text: "Really enjoyed my visit to this lovely winery. Booked the grazing box and bottle experience in the garden and it was a perfect, relaxed way to spend a few hours in comfy chairs on the grass. The sparkling wines are delicious." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "The Sparkling Wines are delicious and between the wines and the experience we joined the wine club. The outdoor terrace is beautiful and dogs are welcome. A true Yountville classic." },
  ],

  "cliff-lede-vineyards": [
    { author: "Yelp Visitor", rating: 5, date: "Feb 2025", source: "yelp", text: "We enjoyed a tasting on February 2. The wines are beyond fabulous. Our host Bill was knowledgeable and made the time very enjoyable. Our guests were so impressed with both the quality of wine and our host that they signed up before the end of the tasting." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Amazing wine! Poetry, the wine that defines the work of Cliff Lede, is far and away a wonderful experience. The service was exceptional. A gorgeous day to wine outside in the shade, overlooking the grape vines and rocking to rock and roll music." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Lots of good things to say about this winery. Really good wine. Awesome backstage experience for rock and roll lovers. Good wine club options — which I joined unexpectedly. Overall, exceeded expectations." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "I have been a club member at Cliff Lede for several years. The experience they create during a tasting is exceptional — knowledgeable staff, beautiful grounds, and outstanding Cabernet." },
  ],

  "st-clair-brown": [
    { author: "Ken R.", rating: 5, date: "Sep 2024", source: "google", text: "This place is superb! A hidden gem! We chose this place as our final stop as it offered craft beer and zero alcohol options. This was a unique offering and suited our party of 6 different tastes. Zoe our host was equally superb and therefore an all round worthy and welcoming stop." },
    { author: "Yelp Visitor", rating: 5, date: "Jan 2025", source: "yelp", text: "This was by far our favorite winery during our trip to Napa! Zoe was wonderful, and the wine was fantastic. We essentially had a private tasting since we came during the off season which was an unexpected treat!" },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Sudden trip to Napa, and really glad I happened upon this place! The employee who helped me was really sweet and knowledgeable. The wines are excellent and the urban winery vibe is refreshing." },
    { author: "TripAdvisor Visitor", rating: 5, date: "2024", source: "tripadvisor", text: "My group booked a tasting here during our trip to Napa, and we had an excellent time. Our hostess was very friendly and proved a font of information about the area. The wines she offered were all quite good — an ideal place to kick off a longer tour of the area." },
  ],

  "mutt-lynch-winery": [
    { author: "Anna E.", rating: 5, date: "Sep 2024", source: "google", text: "Such a fun place to visit! Delicious wine and very friendly and attentive service, highly recommend!" },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "I love animals and our Shih Tzu, Disco, had her own doggie charcuterie board! They can actually personalize the bottles with your own dog's picture. Super cool!! Thank you Lisa for a great time!!" },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Really cute spot in downtown Windsor, lots of different wines to taste, tasting is very affordable and they have a plethora of merch for you and your pup. The whole brand is dogs — and the wine is genuinely great!" },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "The tasting room is a co-op shared with Deux Amis so the pairing included both wineries' wines. Such a fun and unique spot. Dog-centric branding done right — the Walk This Zin is our house wine now." },
  ],

  "st-francis-winery": [
    { author: "Stephanie C.", rating: 5, date: "2025", source: "yelp", text: "Arrived on a Saturday, was warmly greeted and walked through the different tours. Did the self-guided tour — about 1.4 miles with 11 stops throughout the vineyards. The landscape of the vineyard is absolutely beautiful. Loved the Chardonnay — it wasn't too dry but very refreshing. A great stop in Santa Rosa." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "We've enjoyed wines from St. Francis Winery for a few years now. Since we are up here in Sonoma we had to stop in. The food and wine pairing was wonderful. Dogs are welcome on the stunning patio." },
    { author: "Yelp Visitor", rating: 4, date: "Feb 2026", source: "yelp", text: "They are very solid. Beautiful views of the mountains. Customer service is solid. The food and wine pairing experience is exceptional — definitely worth the premium price." },
    { author: "Yelp Visitor", rating: 5, date: "2024", source: "yelp", text: "Beautiful mountain views and excellent wines. Honored as Best Winery in Sonoma two years running for good reason. The Old Vine Zinfandel and Cabernet are both outstanding." },
  ],

  "amista-vineyards": [
    { author: "Lydia W.", rating: 5, date: "Jun 2025", source: "google", text: "Sharon was very kind and helpful to us wine novices. Would definitely come back again! The sparkling wines are exceptional and the dog-friendly service made the visit even more special." },
    { author: "travelrab — Portola Valley, CA", rating: 5, date: "Feb 2025", source: "tripadvisor", text: "Definitely worth a stop — had a lovely time tasting with another couple. Comfortable atmosphere, nice selection of wine, and a genuinely welcoming staff." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Amista Vineyard is for all the sparkling wine lovers! This family-owned winery showcases the fabulous fruit and friendly spirit of Dry Creek Valley. Lovely location with friendly staff who are very knowledgeable." },
    { author: "Yelp Visitor", rating: 5, date: "Feb 2026", source: "yelp", text: "We found this place very last minute as a walk-in — wine tasting wasn't even on the itinerary! I'm so glad we went. The staff were warm and knowledgeable, the sparkling wines are exceptional." },
  ],

  "lambert-bridge-winery": [
    { author: "Wei-Ai T.", rating: 5, date: "May 2024", source: "google", text: "Lovely wine tasting experience at this charming and beautiful estate. Clean and well decorated interior space, as well as a manicured garden area that is the perfect location to lounge and sip on the wonderful varietals." },
    { author: "Yelp Visitor", rating: 5, date: "Sep 2025", source: "yelp", text: "Our sommelier J.P. was knowledgeable and engaging. The setting was beautiful and the barrel tasting that we had outdoors was a great way to start off our trip. In particular we loved the Merlot and Cab selections." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Our steward Harrison was not only knowledgeable but delightful! The winery, with its rich coffee wood grain and oak-lined barrels, was food for the eyes and the excellent wines wrapped the overall experience to a fine finish. There is nothing ordinary about Lambert Bridge Winery." },
    { author: "Yelp Visitor", rating: 5, date: "Apr 2025", source: "yelp", text: "We had a great experience wine tasting with Harrison. He was extremely knowledgeable about the wine making process and very engaging. The Chardonnay and Merlot are both excellent. A true Dry Creek Valley gem." },
  ],

  "muscardini-cellars": [
    { author: "melindag168 — Seattle, WA", rating: 5, date: "Oct 2025", source: "tripadvisor", text: "Would taste these wines any day! Had a beautiful day, great wines, and perfect charcuterie. The Italian varietals are a wonderful change of pace in Sonoma." },
    { author: "seawaif", rating: 5, date: "Aug 2025", source: "tripadvisor", text: "A great place to start the weekend in Sonoma. Had an excellent time and was greeted by the manager Nick. The wines are exceptional and the outdoor patio is wonderful." },
    { author: "Tiffiney G.", rating: 5, date: "2025", source: "yelp", text: "Laid back winery located off of highway 12. I loved being able to choose the wines I wanted to taste. The server was attentive, the charcuterie was tasty, and the seating options indoors and out are great." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Sommelier Isabella was so knowledgeable about the wines — and being Italian herself, having lived in Italy, she provided an extra authentic experience. Karen's food and wine pairings are also masterful. A true hidden gem in Kenwood." },
  ],

  "gundlach-bundschu": [
    { author: "Chuck A", rating: 5, date: "Sep 2024", source: "tripadvisor", text: "Cave tour with friends — our guide was knowledgeable, everyone enjoyed it, and the merch shop was an added treat. One of our faves and a must-stop in Sonoma. The history of GunBun as the oldest family-owned winery really comes through in every part of the experience." },
    { author: "TripAdvisor Visitor", rating: 5, date: "2025", source: "tripadvisor", text: "My wife and I visited for a tasting on a Tuesday afternoon. Misty was our host/educator and she did an excellent job teaching us about the vineyard and the wines. We were seated outside, overlooking a pond with geese and ducks. It's been a long time since I've been that relaxed." },
    { author: "TripAdvisor Visitor", rating: 5, date: "2025", source: "tripadvisor", text: "My best friend and I decided to take a trip to California Wine Country to celebrate life! Gundlach Bundschu was a favorite! Not only for the taste of the wine but also for the amazing atmosphere — we had an outdoor tasting on the banks of a stunning pond at the foot of the Sonoma Hills." },
    { author: "TripAdvisor Visitor", rating: 5, date: "2024", source: "tripadvisor", text: "After loading up on deli supplies, we drove out to GunBun for an afternoon lunch on the grounds. They have a beautiful picnic area south of the tasting room. Very dog-friendly and the Pinot Noir and Gewurztraminer are excellent." },
  ],

  "larson-family-winery": [
    { author: "Velnette J.", rating: 5, date: "2025", source: "yelp", text: "We've been coming for years and love this place! The wine membership is great. They are incredibly kid friendly and our kids love playing with the dogs. Bob takes care of us with tastings. Highly recommend!" },
    { author: "Haru Y.", rating: 5, date: "2025", source: "yelp", text: "This is a great place to go for an afternoon of wine tasting. It's family friendly, dog friendly, and probably the most unpretentious winery in Northern California. The wines are great and the staff is super friendly. Spent the afternoon listening to live jazz and taking pictures." },
    { author: "Holly K.", rating: 5, date: "2025", source: "yelp", text: "I had the best time at Larson Family Winery! Everyone who worked in the tasting room was AWESOME, the two dogs who call the winery home were so well behaved, the wine was superb and the atmosphere both inside and out was fantastic." },
    { author: "Yelp Visitor", rating: 5, date: "2024", source: "yelp", text: "This winery is the hidden gem of Sonoma! The animals, the bocce ball, the picnic area — this is what wine country should be. I have brought all my family, friends, and coworkers here." },
  ],

  "deerfield-ranch-winery": [
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "One of the things I take away from Deerfield Ranch Winery is as soon as you enter the cave you smell the wine. It is an extraordinary experience unlike any other tasting room in Sonoma. The red blends are exceptional." },
    { author: "Yelp Visitor", rating: 5, date: "Jan 2026", source: "yelp", text: "A truly unique Sonoma valley experience. We stumbled upon Deerfield Ranch Winery while researching options online. The cave tasting room is extraordinary and the wines are excellent." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "I left knowing so much more about Clean Wine and wanting to share it with my friends and family! The certified organic approach makes the wines taste genuinely different. A standout in Kenwood." },
    { author: "Yelp Visitor", rating: 4, date: "2024", source: "yelp", text: "It's a winery in Sonoma so you would expect it to be good — I'm here to say heck yeah the wine was good. The cave is the real draw. Dogs are welcome on the grounds. Well worth the reservation." },
  ],

  "seghesio-family-vineyards": [
    { author: "Angie", rating: 4, date: "Dec 2024", source: "google", text: "Nice location, pleasant surroundings with a nice outdoor area. One of the oldest wineries with a strong focus on Zinfandel. All the staff are very friendly — our host Kathleen was very knowledgeable about the winery and the wines. We tried the classic tasting and will definitely try the Italian tasting next time. Joined as a member." },
    { author: "Brent", rating: 5, date: "Feb 2025", source: "google", text: "Exceptional sustainable practices recognized by Wine Spectator. The Zinfandel is world-class and the staff are passionate and welcoming. A Healdsburg institution done right." },
    { author: "Yelp Visitor", rating: 5, date: "May 2026", source: "yelp", text: "Just had the loveliest lunch and wine tasting at this vineyard! We had about 15 of us in for a family reunion — everyone was incredibly well taken care of. The Zinfandel is world-class." },
    { author: "Yelp Visitor", rating: 5, date: "Jan 2026", source: "yelp", text: "Always wonderful wines and staff. Beautiful grounds and pup-friendly! Will always support an incredible family winery. The Zinfandel is consistently one of the best in Sonoma." },
  ],

  "bartholomew-estate-winery": [
    { author: "Oreo P.", rating: 5, date: "Nov 2024", source: "google", text: "Pet friendly winery! They allow dogs inside and outside. It is really nice outside — they have a big tree and a lot of nice area where you can take pictures and enjoy nature. Beautiful vineyards." },
    { author: "Chelsea C.", rating: 5, date: "Mar 2024", source: "google", text: "A WONDERFUL experience. Friendly helpful service, scenic natural views outdoors. Beautiful vineyards even in winter. Lovely long hiking trail around the property that took me 1.5 hours to walk including some stops for photos." },
    { author: "Yelp Visitor", rating: 4, date: "Jan 2025", source: "yelp", text: "The Bartholomew Estate winery is a lovely intimate winery setting. The presentation, grounds, staff — pretty much everything — are quaint, romantic, and very picturesque. I would describe the wines as being very tasty." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "A stunning winery out in nature! Highly recommend this spot for good wine and a nature walk. The historic setting is beautiful and the outdoor seating areas are exceptional." },
  ],

  "kunde-family-winery": [
    { author: "Yelp Visitor", rating: 5, date: "Nov 2024", source: "yelp", text: "Third visit today — absolutely amazing experience. First of all it's incredibly beautiful right now with the fall colors. Sean, Rae, and Sally helped us with a bar lounge tasting and they were so incredibly kind and helpful. Couldn't ask for a better experience — and I picked up my shipment of wines!" },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "If I could give this spot 10 stars, I totally would. Kunde Winery was the absolute best winery I have ever experienced. We started our tour in a small bus around the property where we experienced stunning views, and our tour concluded in a wine cave paired with individual charcuterie boards." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "We had the absolute pleasure of touring Kunde Vineyards with Sally, and she made an already unforgettable day even more special — we got engaged during our visit, and Sally went above and beyond to make the moment magical. Her warmth, kindness, and passion for the vineyard created such a welcoming atmosphere." },
    { author: "Yelp Visitor", rating: 5, date: "Nov 2025", source: "yelp", text: "Our favorite from several wineries visited on a recent Sonoma trip. The grounds are absolutely beautiful — cave tours, mountain views, and really solid wines at a great price point." },
  ],

  "br-cohn-winery": [
    { author: "Julianne Johnson", rating: 5, date: "2025", source: "google", text: "Our server Christina made our visit absolutely perfect. She was very knowledgeable and extremely personable — we enjoyed talking with her throughout our visit. She allowed us to try a Malbec outside of our scheduled tasting which we ended up purchasing a bottle of to take home." },
    { author: "TripAdvisor Visitor", rating: 5, date: "Oct 2024", source: "tripadvisor", text: "BR Cohn is not only a beautiful winery with gorgeous grounds but the staff are fantastic! Our server was Danny and he was warm and very responsive! The wine was delicious! Highly recommend!" },
    { author: "TripAdvisor Visitor", rating: 5, date: "2024", source: "tripadvisor", text: "As a music fan, all of the memorabilia was awesome to see. Our Tasting Expert Danny was a true tasting EXPERT. He took time to sit with us and teach us the proper ways to observe, smell, taste, savor. We learned so much! I joined the wine club!" },
    { author: "Yelp Visitor", rating: 5, date: "Mar 2026", source: "yelp", text: "Beautiful location and facility, all wonderful. But the real treasure here are the wines and hospitality. The Olive Hill Cabernet is exceptional. Dogs are welcome on the beautiful grounds." },
  ],

  "round-pond-estate": [
    { author: "Toni-ann C", rating: 5, date: "May 2025", source: "tripadvisor", text: "Came on a Saturday afternoon for the Portfolio Tasting and was provided great service by Cruz. The grounds are beautiful and the weather was perfect on the patio. Besides taking us through the great wines, Cruz also had great dinner recommendations for both Napa and Sonoma. Highly recommended." },
    { author: "jeanniedc", rating: 5, date: "Sep 2024", source: "tripadvisor", text: "While not inexpensive, this is a wonderful experience in Rutherford. The setting itself is beautiful — vineyards and about 3,000 olive trees. Our guide was super pleasant and incredibly knowledgeable about the milling process and history of Round Pond. A truly unique combination of wine and olive oil." },
    { author: "TripAdvisor Visitor", rating: 5, date: "2025", source: "tripadvisor", text: "This was by far the best winery we visited during our 3-day stay in Napa! Hospitality is exceptional. I would highly recommend requesting wine educator Juan — he was knowledgeable, personable, and helped make our visit a truly great experience." },
    { author: "TripAdvisor Visitor", rating: 5, date: "2024", source: "tripadvisor", text: "Wonderful service and history stories from Stephanie — great charcuterie tray and outstanding wines. We already can't wait to pick up our first wine club shipment. Round Pond Estate offers an unforgettable combination of scenery, hospitality, and wine." },
  ],

  "pride-mountain-vineyards": [
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Amazing tour and tasting. Our host Paul was an awesome guide — so friendly, knowledgeable, and really made our visit special. The mountain setting is breathtaking and the wines are world-class. Real candles in the caves — straight out of a dream." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "Pride Mountain has been a staple for us for years. Never a disappointment when we visit. The staff — Jay, Travis, Rebecca — are consistently outstanding and the Cabernet and Merlot are among the best in Napa." },
    { author: "Yelp Visitor", rating: 5, date: "2025", source: "yelp", text: "A truly exceptional experience. The mountain vineyard setting is unlike anything else in Napa. The 90-minute Estate Experience at $50/person is worth every cent. The reserve Cabernet is phenomenal. Load the address before you leave St. Helena — cell service is spotty on the mountain road." },
    { author: "Yelp Visitor", rating: 5, date: "2024", source: "yelp", text: "One of the best winery visits of our trip. The Mayacamas Mountain setting is stunning, the wines are outstanding, and Katrina was a wonderful host. The panoramic views of Mt. St. Helena from the picnic spots are breathtaking." },
  ],

  "ehlers-estate": [
    { author: "PR_Bride — San Diego, CA", rating: 5, date: "Jan 2025", source: "tripadvisor", text: "Amazing experience! Host Nurit was an amazing hostess and guide. She welcomed us with Schramsberg's sparkling wine and poured four Ehlers reds. I really liked the Cab Franc and Leducq. The custom tapestries in the renovated tasting room are absolutely gorgeous." },
    { author: "db7477 — Carlsbad, CA", rating: 5, date: "Jul 2024", source: "tripadvisor", text: "This was the most laid-back, personalized, no-pressure tasting I did while in Napa. There were just three of us and Cole led our tasting. Every wine was fantastic — I visited 8 other vineyards during our short stay and Ehlers provided the most consistency across the board for a great price." },
    { author: "Yelp Visitor", rating: 5, date: "Apr 2026", source: "yelp", text: "I had such a wonderful time visiting Ehlers. You must schedule an appointment ahead of time — but it is absolutely worth it. The historic stone winery is beautiful and the wines are outstanding." },
    { author: "Yelp Visitor", rating: 5, date: "2024", source: "yelp", text: "A winery with a heart — Ehlers Estate is a non-profit philanthropic entity that supports cardiovascular research. The wines are exceptional and the mission makes every bottle feel even more meaningful." },
    { author: "Yelp Visitor", rating: 5, date: "Aug 2024", source: "yelp", text: "What a wonderful day our team had at this private tasting! The grounds were lovely, our host was so knowledgeable and not at all pretentious. The Cab Franc and Merlot were both outstanding." },
  ],
};

export function getReviews(slug: string): YelpReview[] {
  return YELP_REVIEWS[slug] ?? [];
}
