import type { CuratedPostImageAsset, PostImageAsset } from "./postImageAssets";

const importedMonthlyAssetData = [
  {
    "guideId": "monthly-guide-february",
    "sourcePostId": "1666500993770799",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1666500993770799/",
    "postAuthor": "Marie Furry",
    "postedDate": "31 มกราคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗙𝗲𝗯𝗿𝘂𝗮𝗿𝘆 😺 ทุกอย่างในเดือน กพ",
    "summary": "𝗙𝗲𝗯𝗿𝘂𝗮𝗿𝘆 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗙𝗲𝗯𝗿𝘂𝗮𝗿𝘆 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 19,
    "monthLabel": "February - กุมภาพันธ์"
  },
  {
    "guideId": "monthly-guide-march",
    "sourcePostId": "1686910071729891",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1686910071729891/",
    "postAuthor": "Marie Furry",
    "postedDate": "2 มีนาคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗠𝗮𝗿𝗰𝗵 😺 ทุกอย่างในเดือน มึค",
    "summary": "𝗠𝗮𝗿𝗰𝗵 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗠𝗮𝗿𝗰𝗵 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 22,
    "monthLabel": "March - มีนาคม"
  },
  {
    "guideId": "monthly-guide-april",
    "sourcePostId": "1703314596756105",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1703314596756105/",
    "postAuthor": "Marie Furry",
    "postedDate": "30 มีนาคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗔𝗽𝗿𝗶𝗹 😺 ทุกอย่างในเดือน เมย",
    "summary": "𝗔𝗽𝗿𝗶𝗹 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗔𝗽𝗿𝗶𝗹 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 18,
    "monthLabel": "April - เมษายน"
  },
  {
    "guideId": "monthly-guide-may",
    "sourcePostId": "1721350574952507",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1721350574952507/",
    "postAuthor": "Marie Furry",
    "postedDate": "1 พฤษภาคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗜𝗻 𝗠𝗮𝘆 😺 ทุกอย่างในเดือน พค",
    "summary": "𝗠𝗮𝘆 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗠𝗮𝘆 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 19,
    "monthLabel": "May - พฤษภาคม"
  },
  {
    "guideId": "monthly-guide-june",
    "sourcePostId": "1738533369900894",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1738533369900894/",
    "postAuthor": "Marie Furry",
    "postedDate": "30 พฤษภาคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗜𝗻 𝗝𝘂𝗻𝗲 😺 ทุกอย่างในเดือน มิย",
    "summary": "𝗝𝘂𝗻𝗲 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗝𝘂𝗻𝗲 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 20,
    "monthLabel": "June - มิถุนายน"
  },
  {
    "guideId": "monthly-guide-july",
    "sourcePostId": "1757413258012905",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1757413258012905/",
    "postAuthor": "Marie Furry",
    "postedDate": "30 มิถุนายน 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗜𝗻 𝗝𝘂𝗹𝘆 😺 ทุกอย่างในเดือน กค",
    "summary": "𝗝𝘂𝗹𝘆 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗝𝘂𝗹𝘆 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 17,
    "monthLabel": "July - กรกฎาคม"
  },
  {
    "guideId": "monthly-guide-august",
    "sourcePostId": "1774368226317408",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1774368226317408/",
    "postAuthor": "Marie Furry",
    "postedDate": "29 กรกฎาคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗜𝗻 𝗔𝘂𝗴𝘂𝘀𝘁 😺 ทุกอย่างในเดือน สค",
    "summary": "𝗔𝘂𝗴𝘂𝘀𝘁 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗔𝘂𝗴𝘂𝘀𝘁 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 18,
    "monthLabel": "August - สิงหาคม"
  },
  {
    "guideId": "monthly-guide-september",
    "sourcePostId": "1791913917896172",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1791913917896172/",
    "postAuthor": "Marie Furry",
    "postedDate": "31 สิงหาคม 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗦𝗲𝗽𝘁𝗲𝗺𝗯𝗲𝗿 😺 ทุกอย่างในเดือน กย",
    "summary": "𝗦𝗲𝗽𝘁𝗲𝗺𝗯𝗲𝗿 - 𝗘𝘃𝗲𝗻𝘁𝘀, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲𝘀 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗦𝗲𝗽𝘁𝗲𝗺𝗯𝗲𝗿 - 𝗘𝘃𝗲𝗻𝘁𝘀, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲𝘀 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 18,
    "monthLabel": "September - กันยายน"
  },
  {
    "guideId": "monthly-guide-october",
    "sourcePostId": "1808969399523957",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1808969399523957/",
    "postAuthor": "Marie Furry",
    "postedDate": "29 กันยายน 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗢𝗰𝘁𝗼𝗯𝗲𝗿 😺 ทุกอย่างในเดือน ตค",
    "summary": "𝗢𝗰𝘁𝗼𝗯𝗲𝗿 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗢𝗰𝘁𝗼𝗯𝗲𝗿 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 22,
    "monthLabel": "October - ตุลาคม"
  },
  {
    "guideId": "monthly-guide-november",
    "sourcePostId": "1830049874082576",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1830049874082576/",
    "postAuthor": "Marie Furry",
    "postedDate": "4 พฤศจิกายน 2023",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗡𝗼𝘃𝗲𝗺𝗯𝗲𝗿 😺 ทุกอย่างในเดือน พย",
    "summary": "𝗡𝗼𝘃𝗲𝗺𝗯𝗲𝗿 𝗨𝗽𝗱𝗮𝘁𝗲 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗡𝗼𝘃𝗲𝗺𝗯𝗲𝗿 𝗨𝗽𝗱𝗮𝘁𝗲 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 23,
    "monthLabel": "November - พฤศจิกายน"
  },
  {
    "guideId": "monthly-guide-december",
    "sourcePostId": "2091897291231165",
    "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/2091897291231165/",
    "postAuthor": "Marie Furry",
    "postedDate": "1 ธันวาคม 2024",
    "title": "𝗔𝗖𝗡𝗛 𝗔𝗹𝗹 𝗶𝗻 𝗗𝗲𝗰𝗲𝗺𝗯𝗲𝗿 😺 ทุกอย่างในเดือน ธค",
    "summary": "𝗗𝗲𝗰𝗲𝗺𝗯𝗲𝗿 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "sourceExcerpt": "𝗗𝗲𝗰𝗲𝗺𝗯𝗲𝗿 - 𝗘𝘃𝗲𝗻𝘁, 𝗦𝗲𝗮𝘀𝗼𝗻𝗮𝗹 𝗜𝘁𝗲𝗺𝘀, 𝗗𝗜𝗬𝘀 & 𝗖𝗵𝗮𝗻𝗴𝗲 𝗶𝗻 𝗔𝗖𝗡𝗛",
    "imageCount": 30,
    "monthLabel": "December - ธันวาคม"
  }
] as const;

function makeMonthlyImages(guideId: string, title: string, imageCount: number): PostImageAsset[] {
  return Array.from({ length: imageCount }, (_, index) => {
    const order = index + 1;
    const paddedOrder = String(order).padStart(2, "0");
    const imageId = `${guideId}-${paddedOrder}`;

    return {
      imageId,
      order,
      src: `/content-images/curated-post-images/${guideId}/${imageId}.jpg`,
      alt: `ภาพประกอบโพสต์ ${title} รูปที่ ${order}`,
      caption: `ภาพประกอบจากโพสต์ต้นทาง รูปที่ ${order}`,
    };
  });
}

export const monthlyImportedPostImageAssets: CuratedPostImageAsset[] = importedMonthlyAssetData.map((asset) => ({
  guideId: asset.guideId,
  sourcePostId: asset.sourcePostId,
  sourceUrl: asset.sourceUrl,
  postAuthor: asset.postAuthor,
  postedDate: asset.postedDate,
  title: asset.title,
  summary: asset.summary,
  sourceExcerpt: asset.sourceExcerpt,
  imageCount: asset.imageCount,
  images: makeMonthlyImages(asset.guideId, asset.title, asset.imageCount),
}));
