import { getPostImage } from "./postImageAssets";
import type { ArticleContentData, ArticleImage } from "../types/content";

function postImage(guideId: string, order: number, caption: string, alt?: string): ArticleImage | undefined {
  const image = getPostImage(guideId, order);
  if (!image) return undefined;

  return {
    src: image.src,
    alt: alt || image.alt,
    caption,
  };
}

function imageGallery(images: Array<ArticleImage | undefined>) {
  return {
    type: "gallery" as const,
    images: images.filter((image): image is ArticleImage => Boolean(image)),
  };
}

const beginnerCoverImage = postImage(
  "beginner-walkthrough-main",
  1,
  "สรุปภาพ First Week Timeline: Day 1 พบ Timmy/Tommy, ได้สูตร Fishing Rod และ Net, เก็บไม้ 5 กิ่ง, ตั้งเต็นท์, ได้ DIY ขวาน/บัวรดน้ำแบบ flimsy และจ่ายเงินกู้ 5,000 Nook Miles; Day 2 เริ่มเควสต์ Nook's Cranny, บริจาคสัตว์/ฟอสซิลให้ Blathers, ได้สูตร Shovel กับ Vaulting Pole และไปเกาะ NMT; Day 3 สร้าง Nook's Cranny สำเร็จ; Day 4 วางสะพานแรกและจัดที่ดิน 3 หลัง; Day 5-7 ปลดล็อก customization, Harv's Island, Able Sisters, Resident Services/Isabelle และจบ Project K",
  "ภาพสรุปไทม์ไลน์สัปดาห์แรกของผู้เล่นใหม่ใน Animal Crossing New Horizons",
);

const beginnerTerminologyImage = postImage(
  "beginner-walkthrough-main",
  2,
  "คำศัพท์จากภาพ: NMT = Nook Miles Ticket, AC/AC:NH = Animal Crossing / Animal Crossing: New Horizons, TT = Time Travel, Island Representative = ผู้เล่นหลักที่สร้างเกาะ, DIY = สูตรคราฟต์, NSO = Nintendo Switch Online",
  "ตารางคำศัพท์พื้นฐานที่ผู้เล่นใหม่ ACNH มักเจอ",
);

const beginnerCheckInImage = postImage(
  "beginner-walkthrough-main",
  3,
  "จุดเริ่มต้นของเกม: Timmy และ Tommy จะพาเราเข้าสู่ขั้นตอนสมัครแพ็กเกจเกาะร้างและสร้างตัวละคร",
  "Timmy และ Tommy ต้อนรับผู้เล่นที่เคาน์เตอร์เช็กอินแพ็กเกจเกาะร้าง",
);

const beginnerIslandLayoutImage = postImage(
  "beginner-walkthrough-main",
  4,
  "หน้าจอเลือกรูปแบบเกาะ เกมจะสุ่มตัวเลือกมา 4 แบบต่อรอบ",
  "หน้าจอเลือกแผนที่เกาะเริ่มต้น 4 แบบใน ACNH",
);

const beginnerHemisphereImage = postImage(
  "beginner-walkthrough-main",
  5,
  "ตัวอย่างภาพอธิบายซีกโลกเหนือและซีกโลกใต้ ซึ่งส่งผลต่อฤดูกาลบนเกาะ",
  "ภาพเปรียบเทียบ Northern Hemisphere และ Southern Hemisphere",
);

export const beginnerWalkthroughMainContent: ArticleContentData = {
  label: "Beginner's Guide",
  lead: [
    "ไกด์นี้เป็นลำดับเริ่มต้นสำหรับผู้เล่นใหม่ ตั้งแต่หน้าจอเช็กอิน สร้างตัวละคร เลือกแผนที่ เลือกซีกโลก ไปจนถึงภารกิจแรกบนเกาะ",
    "โครงนี้เหมาะกับการอ่านตามไทม์ไลน์: รูปที่มีข้อมูลสำคัญจะถูกแทรกใกล้หัวข้อที่เกี่ยวข้อง ส่วนภาพสรุปบางใบจะถอดเป็นข้อความให้ค้นหาและย้ายไปหลังบ้านได้ง่ายขึ้น",
  ],
  coverImage: beginnerCoverImage,
  body: [
    ...(beginnerTerminologyImage
      ? [
          {
            type: "image" as const,
            image: beginnerTerminologyImage,
            size: "wide" as const,
          },
        ]
      : []),
  ],
  sections: [
    {
      title: "Walkthrough - Timeline: คำแนะนำเรียงตามไทม์ไลน์",
      blocks: [
        {
          type: "paragraph",
          text: "Day 1 คือช่วงตั้งค่าพื้นฐานของเกาะและตัวละคร หลายอย่างยังเปลี่ยนภายหลังได้ แต่บางอย่างจะผูกกับเซฟนี้ยาว ๆ จึงควรตัดสินใจก่อนกดยืนยัน",
        },
      ],
    },
    {
      title: "1.1 Setup - การติดตั้ง",
      blocks: [
        ...(beginnerCheckInImage
          ? [
              {
                type: "image" as const,
                image: beginnerCheckInImage,
                size: "wide" as const,
              },
            ]
          : []),
        {
          type: "paragraph",
          text: "เมื่อเริ่มเกม Timmy และ Tommy จะทักทายเรา และช่วยให้เราสร้างเกาะของเราเองตามขั้นตอนแรกของแพ็กเกจเกาะร้าง",
        },
      ],
    },
    {
      title: "1.2 Creating Your Character - สร้างตัวละคร",
      blocks: [
        {
          type: "paragraph",
          text: "ทำตามคำอธิบายบนหน้าจอเพื่อสร้างตัวละคร รูปลักษณ์อย่างสีตา สีผม ทรงผม สีผิว และเสื้อผ้า สามารถเปลี่ยนภายหลังได้ไม่จำกัด",
        },
        {
          type: "note",
          title: "คำเตือน",
          text: "ชื่อและวันเกิดของตัวละครไม่สามารถเปลี่ยนภายหลังได้ ถ้าอยากเปลี่ยนต้องเริ่มเกมใหม่ จึงควรแน่ใจก่อนยืนยัน",
        },
      ],
    },
    {
      title: "1.3 Choosing an Island Layout - เลือกรูปแบบเกาะ",
      blocks: [
        ...(beginnerIslandLayoutImage
          ? [
              {
                type: "image" as const,
                image: beginnerIslandLayoutImage,
                size: "wide" as const,
              },
            ]
          : []),
        {
          type: "paragraph",
          text: "เกมจะให้เลือกแผนที่เกาะ 4 แบบ ขั้นตอนนี้สำคัญเพราะเป็นตัวกำหนดสิ่งที่ติดตั้งถาวร เช่น Resident Services, ปากทางน้ำ, สนามบิน และชายหาดลับด้านเหนือ",
        },
        {
          type: "note",
          title: "หมายเหตุ",
          text: "ถ้าไม่ชอบตัวเลือกทั้ง 4 แบบ ให้ออกจากเกมแล้วเริ่มใหม่ เกมจะสุ่มตัวเลือกใหม่ขึ้นมา ทำซ้ำได้จนกว่าจะเจอแบบที่พอใจ",
        },
      ],
    },
    {
      title: "1.4 Choosing Your Hemisphere - เลือกซีกโลก",
      blocks: [
        ...(beginnerHemisphereImage
          ? [
              {
                type: "image" as const,
                image: beginnerHemisphereImage,
                size: "wide" as const,
              },
            ]
          : []),
        {
          type: "paragraph",
          text: "ซีกโลกคือครึ่งหนึ่งของโลกเมื่อแบ่งด้วยเส้นศูนย์สูตร ครึ่งบนคือซีกโลกเหนือ ส่วนครึ่งล่างคือซีกโลกใต้ ประเทศไทยอยู่ซีกโลกเหนือ",
        },
        {
          type: "paragraph",
          text: "ทั้งสองซีกโลกมี 4 ฤดู มีกิจกรรม ไอเทม และตัวละครเหมือนกัน แต่ฤดูกาลจะสลับช่วงเวลากัน แนะนำให้เลือกซีกโลกที่เราอาศัยอยู่ หรือเลือกตามบรรยากาศที่ชอบก็ได้",
        },
      ],
    },
    {
      title: "1.5 Hemisphere Season Correlation - ความสัมพันธ์ของฤดูกาล",
      blocks: [
        {
          type: "checklist",
          title: "ฤดูกาลของแต่ละซีกโลก",
          items: [
            "มีนาคม - พฤษภาคม: ซีกเหนือเป็นฤดูใบไม้ผลิ / ซีกใต้เป็นฤดูใบไม้ร่วง",
            "มิถุนายน - สิงหาคม: ซีกเหนือเป็นฤดูร้อน / ซีกใต้เป็นฤดูหนาว",
            "กันยายน - พฤศจิกายน: ซีกเหนือเป็นฤดูใบไม้ร่วง / ซีกใต้เป็นฤดูใบไม้ผลิ",
            "ธันวาคม - กุมภาพันธ์: ซีกเหนือเป็นฤดูหนาว / ซีกใต้เป็นฤดูร้อน",
          ],
        },
        {
          type: "paragraph",
          text: "คำถาม If You Could Only Bring ONE Thing With You... เป็นคำถามเพื่อความสนุกเท่านั้น เลือกตอบอะไรก็ได้ตามใจเรา",
        },
      ],
    },
    {
      title: "1.7 Arriving at Your Island - มาถึงเกาะของเราแล้ว",
      blocks: [
        {
          type: "paragraph",
          text: "หลังจากตั้งค่าขั้นตอนหลักกับ Timmy และ Tommy แล้ว เราจะขึ้นเครื่องบินไปยังเกาะของตัวเอง และเริ่มบทแรกอย่างเป็นทางการ",
        },
        {
          type: "paragraph",
          text: "ช่วงนี้จะได้พบ Tom Nook, Timmy, Tommy และชาวเกาะเริ่มต้น 2 คน โดยชาวเกาะเริ่มต้นจะเป็นนิสัย Jock และ Sisterly/Uchi เสมอ",
        },
        {
          type: "note",
          title: "รีเซ็ตเกาะได้ไหม",
          text: "ถ้าไม่ชอบชาวเกาะเริ่มต้น ผลไม้ประจำเกาะ หรือสีสนามบิน สามารถรีเซ็ตเกาะได้จนกว่าจะพอใจ แต่ชาวเกาะไม่ใช่ผู้อยู่อาศัยถาวรและย้ายออกได้ในภายหลัง",
        },
      ],
    },
    {
      title: "1.9 Setup Your Tent - ตั้งเต็นท์ของเรา",
      blocks: [
        {
          type: "paragraph",
          text: "คุยกับ Tom Nook เพื่อรับโจทย์หาจุดตั้งเต็นท์ จากนั้นคุยกับ Timmy หรือ Tommy เพื่อรับ Tent Kit แล้วเปิดกระเป๋าด้วยปุ่ม X เลือก Tent Kit และเลือก Place",
        },
        {
          type: "note",
          title: "หมายเหตุ",
          text: "ช่วงแรกยังข้ามแม่น้ำไม่ได้ จึงวางเต็นท์ได้เฉพาะพื้นที่ที่เชื่อมกับ Resident Services เท่านั้น และจะยังย้ายบ้านไม่ได้ในระยะหนึ่ง",
        },
        {
          type: "paragraph",
          text: "หลังจากวางเต็นท์ตัวเองแล้ว ให้คุยกับชาวเกาะที่มีควันความคิดบนหัว เราสามารถให้เขาวางตรงจุดที่ยืนอยู่ หรือเลือก I'll choose a place for you เพื่อรับชุดเต็นท์แล้วไปเลือกตำแหน่งให้เอง",
        },
      ],
    },
    {
      title: "1.11 Collect Materials - รวบรวมวัตถุดิบ",
      blocks: [
        {
          type: "paragraph",
          text: "หลังวางเต็นท์ครบ 3 หลัง Tom Nook จะให้เรียนรู้การรวบรวมวัตถุดิบ โดยต้องเก็บ Tree Branches 10 ชิ้นและผลไม้",
        },
        {
          type: "paragraph",
          text: "กด A ซ้ำ ๆ ขณะหันหน้าเข้าหาต้นไม้เพื่อเขย่า ถ้ามีผลไม้ก็จะร่วงลงมา ถ้าไม่มีอาจสุ่มได้กิ่งไม้ รังต่อ หรือ Bells จากนั้นกด Y เพื่อเก็บของบนพื้น",
        },
        {
          type: "note",
          title: "Tree Branches ไม่ใช่ Wood",
          text: "กิ่งไม้ได้จากการเขย่าต้นไม้ ส่วนไม้ชนิดต่าง ๆ ได้จากการใช้ขวานเคาะหรือตัดต้นไม้",
        },
      ],
    },
    {
      title: "1.12 Party Time + Naming Your Island - ฉลองและตั้งชื่อเกาะ",
      blocks: [
        {
          type: "paragraph",
          text: "หลังทำภารกิจเสร็จ Tom Nook จะจัดปาร์ตี้หน้าเต็นท์ Resident Services เมื่อฉลองเสร็จแล้วให้เข้าเต็นท์และนอนบนเตียงเปล จากนั้น K.K. Slider จะมาเข้าฝันเพื่อยืนยันชื่อเกาะที่เราตั้งไว้",
        },
        {
          type: "note",
          title: "คำเตือน",
          text: "ชื่อเกาะไม่สามารถเปลี่ยนภายหลังได้ และในช่วงบทแรกก่อนนอนในเต็นท์จะยังเซฟเกมไม่ได้จนกว่าจะนอนและเวลาในเกมซิงก์กับเวลาจริง",
        },
      ],
    },
  ],
  checklist: {
    title: "เช็กลิสต์ Day 1 สำหรับผู้เริ่มต้น",
    items: [
      "ตั้งชื่อตัวละคร วันเกิด และชื่อเกาะให้แน่ใจก่อนยืนยัน",
      "เลือกแผนที่โดยดู Resident Services, ปากทางน้ำ, สนามบิน และชายหาดลับ",
      "เลือกซีกโลกที่ต้องการเล่นระยะยาว",
      "วางเต็นท์ตัวเองและช่วยชาวเกาะเริ่มต้นวางเต็นท์",
      "เก็บกิ่งไม้และผลไม้เพื่อผ่านภารกิจแรก",
    ],
  },
  closing: "โครงนี้เป็นตอนเริ่มต้นของบท Beginner's Guide และสามารถเติม Day 2-7 ต่อเป็น section เพิ่มได้โดยใช้รูปและ block แบบเดียวกัน",
};

const januaryGuideId = "monthly-guide-january";

export const monthlyGuideJanuaryContent: ArticleContentData = {
  label: "Monthly Guide",
  lead: [
    "เดือนมกราคมเป็นเดือนที่สองของฤดูหนาวในซีกโลกเหนือ เกาะยังมีหิมะปกคลุมและยังฟาร์ม Perfect Snowboy รวมถึงวัตถุดิบ Ornament ได้ช่วงต้นเดือน",
    "ฝั่งซีกโลกใต้ยังอยู่ในฤดูร้อน เหมาะกับการไล่จับแมลงและสัตว์เขตร้อนหลายชนิด โดยเฉพาะกลุ่มด้วงหายากที่เริ่มเด่นขึ้นในช่วงนี้",
    "วันที่ 1 มกราคมเป็น New Year's Day เกาะจะมีเพลงประกอบธีมปีใหม่ตลอดวัน เป็นบรรยากาศสำหรับเริ่มต้นรอบปีใหม่ในเกม",
  ],
  coverImage: postImage(
    januaryGuideId,
    1,
    "ภาพรวม ACNH All January Update: รวมไฮไลต์เดือนมกราคม เช่น New Year's Day, The Roost, พระอาทิตย์แรกของปี, Aurora, และกิจกรรมตามฤดูกาล",
    "ภาพรวมไกด์ทุกอย่างในเดือนมกราคมของ Animal Crossing New Horizons",
  ),
  sections: [
    {
      title: "ไฮไลต์ช่วงปีใหม่",
      blocks: [
        {
          type: "paragraph",
          text: "ต้นเดือนยังมีหลายอย่างที่ควรรีบเช็ก ทั้งโบนัสจาก Nook Stop, ของขวัญจากแม่, บรรยากาศพิเศษใน The Roost และวัตถุดิบ Ornament ที่กำลังจะหมดช่วง",
        },
        imageGallery([
          postImage(januaryGuideId, 2, "โบนัส Nook Miles จาก Nook Stop ช่วงต้นปี หลัง Resident Services ปิดในวัน Countdown"),
          postImage(januaryGuideId, 3, "วันที่ 1 มกราคม ถ้าไปจิบกาแฟที่ The Roost จะได้คำอวยพรเล็ก ๆ จาก Brewster"),
          postImage(januaryGuideId, 4, "ของขวัญจากแม่ประจำเดือนมกราคมคือ Mom's Art ซึ่งเป็นของขวัญปีใหม่ทางจดหมาย"),
          postImage(januaryGuideId, 5, "New Year's Day มีปรากฏการณ์พระอาทิตย์ขึ้นและตกครั้งแรกของปี เป็นบรรยากาศพิเศษของวันปีใหม่"),
          postImage(januaryGuideId, 6, "ซีกโลกเหนือมีโอกาสเจอ Aurora Borealis ในคืนฤดูหนาวที่ฟ้าใสช่วงเวลา 18:00-04:00"),
        ]),
        {
          type: "note",
          title: "Ornament ใกล้หมดช่วง",
          text: "วันที่ 6 มกราคมเป็นวันสุดท้ายของการเก็บ Ornament จากต้น Cedar ประดับไฟ และยังเป็นช่วงสุดท้ายของ Festive Ornaments DIYs ด้วย",
        },
      ],
    },
    {
      title: "สภาพอากาศและพุ่มไม้",
      blocks: [
        imageGallery([
          postImage(januaryGuideId, 7, "ซีกโลกเหนือ: หลังวันที่ 5 มกราคมเป็นช่วงหิมะตกและมีโอกาสเจอ Billow Clouds ในวันอากาศแจ่มใส"),
          postImage(januaryGuideId, 8, "ซีกโลกใต้: หลังวันที่ 5 มกราคมมีฝนและฝนตกหนักบางช่วง พร้อมโอกาสเกิด Cumulonimbus Clouds"),
          postImage(januaryGuideId, 9, "ซีกโลกเหนือ: Pink & Red Camellia Bushes เริ่มบานตั้งแต่ 1 มกราคม ถึง 31 มีนาคม"),
          postImage(januaryGuideId, 10, "ซีกโลกใต้: Plumeria ยังบานต่อ และช่วง 21 มกราคมเป็นต้นไป Hibiscus จะเริ่มเข้ามาแทนบางส่วน"),
        ]),
      ],
    },
    {
      title: "Seasonal Items และโปสการ์ด",
      blocks: [
        {
          type: "paragraph",
          text: "Nook Shopping ยังมีสินค้าเทศกาลปีใหม่และสินค้าตามวัฒนธรรมต่าง ๆ ให้สั่งในแท็บ Seasonal หลายรายการคาบเกี่ยวจากปลายปีและต่อไปถึงกุมภาพันธ์",
        },
        imageGallery([
          postImage(januaryGuideId, 11, "ภาพรวม Seasonal Items ใน Nook Shopping เดือนมกราคม ทั้ง New Year's Day และเทศกาลช่วงปลายเดือน"),
          postImage(januaryGuideId, 12, "Zodiac Snake Figurine วางขายวันที่ 1-5 มกราคมสำหรับปีงู"),
          postImage(januaryGuideId, 13, "Festival of Seven Herbs: Nanakusa Gayu วางขายวันที่ 5-7 มกราคม"),
          postImage(januaryGuideId, 14, "Big Game Celebration: Cheer Megaphones และ Football Rug วางขายวันที่ 15 มกราคม-15 กุมภาพันธ์"),
          postImage(januaryGuideId, 15, "Carnival of Venice: Venetian Carnival Mask วางขายวันที่ 22 มกราคม-13 กุมภาพันธ์"),
          postImage(januaryGuideId, 16, "Groundhog Day: Resetti Model วางขายวันที่ 25 มกราคม-2 กุมภาพันธ์"),
          postImage(januaryGuideId, 17, "Setsubun: Bean-Tossing Kit วางขายวันที่ 25 มกราคม-3 กุมภาพันธ์"),
          postImage(januaryGuideId, 18, "Dodo Airlines มีโปสการ์ด Seasonal ฤดูหนาวของซีกโลกเหนือและฤดูร้อนของซีกโลกใต้"),
          postImage(januaryGuideId, 19, "โปสการ์ด Seasonal Event ยังมี Christmas และเพิ่ม Valentine ช่วงต้นปี"),
        ]),
      ],
    },
    {
      title: "กิจกรรมประจำเดือน",
      blocks: [
        imageGallery([
          postImage(januaryGuideId, 20, "Fishing Tourney สำหรับทั้งสองซีกโลก จัดวันเสาร์ที่ 13 มกราคม เวลา 09:00-18:00"),
          postImage(januaryGuideId, 21, "Bug-Off สำหรับซีกโลกใต้ จัดวันเสาร์ที่ 20 มกราคม เวลา 09:00-18:00"),
        ]),
      ],
    },
    {
      title: "DIY และวัตถุดิบตามฤดูกาล",
      blocks: [
        {
          type: "paragraph",
          text: "สูตร Festive Ornaments ใกล้หมดช่วง ส่วนสูตรฤดูกาลของซีกเหนือและซีกใต้ยังลากยาวต่อไปถึงกุมภาพันธ์ จึงควรเช็กวัตถุดิบที่ยังขาดก่อนหมดเดือน",
        },
        imageGallery([
          postImage(januaryGuideId, 22, "ซีกโลกใต้: Summer Shells Furniture & DIY Recipes ใช้ Summer Shell และมีถึง 29 กุมภาพันธ์"),
          postImage(januaryGuideId, 23, "ซีกโลกเหนือ: Winter Snowflakes & Frozen DIY Recipes ใช้ Snowflakes และ Large Snowflakes"),
          postImage(januaryGuideId, 24, "ทั้งสองซีกโลก: Festive Ornaments Furniture & DIY Recipes มีถึงวันที่ 6 มกราคม"),
        ]),
      ],
    },
    {
      title: "สัตว์เกิดใหม่และสัตว์ที่ควรเช็ก",
      blocks: [
        imageGallery([
          postImage(januaryGuideId, 25, "ภาพรวม New Critter in January: ปลา แมลง และสัตว์ทะเลใหม่ของทั้งสองซีกโลก"),
          postImage(januaryGuideId, 26, "ซีกโลกเหนือไม่มีสัตว์เกิดใหม่เด่นในเดือนนี้ แต่ยังมีสัตว์ประจำปีและสัตว์ฤดูหนาวให้เก็บต่อ"),
          postImage(januaryGuideId, 27, "ตาราง critters เดือนมกราคมอีกชุดจากโพสต์ต้นทาง ใช้ประกอบการเช็กปลา แมลง และสัตว์ทะเล"),
          postImage(januaryGuideId, 28, "ซีกโลกใต้มีแมลงใหม่ 21 ชนิด ปลาใหม่ 5 ชนิด และสัตว์ทะเลใหม่ 3 ชนิด โดยกลุ่มด้วงหายากเริ่มเด่นมาก"),
        ]),
      ],
    },
    {
      title: "วันเกิดและภาพรวมเดือน",
      blocks: [
        imageGallery([
          postImage(januaryGuideId, 29, "Birthday List in January: รายชื่อวันเกิดชาวเกาะประจำเดือนมกราคม"),
          postImage(januaryGuideId, 30, "Birthday List in January: NPCs พร้อมข้อมูลตัวละครที่เกี่ยวข้อง"),
          postImage(januaryGuideId, 31, "January Calendar: สรุปภาพรวมอีเวนต์ วัตถุดิบ และรายการ Nook Shopping ของเดือนมกราคม"),
        ]),
      ],
    },
  ],
  checklist: {
    title: "เช็กลิสต์เดือนมกราคม",
    items: [
      "เก็บ Ornament และ Festive DIY ให้ครบก่อนวันที่ 6 มกราคม",
      "เช็ก Nook Shopping ช่วงวันที่ 1-5, 5-7, 15 มกราคม-15 กุมภาพันธ์ และ 25 มกราคม-ต้นกุมภาพันธ์",
      "ซีกโลกเหนือดูโอกาส Aurora และจัดการ Snowboy/วัตถุดิบฤดูหนาว",
      "ซีกโลกใต้ไล่จับแมลงฤดูร้อนและเตรียม Bug-Off วันที่ 20 มกราคม",
      "เช็ก Fishing Tourney วันที่ 13 มกราคม และวันเกิดชาวเกาะ/NPC ประจำเดือน",
    ],
  },
  closing: "ที่มา: โพสต์ ACNH All in January โดย Marie Furry ในกลุ่ม Animal Crossing: New Horizons Thailand",
};

export const islandVisitorEtiquetteContent: ArticleContentData = {
  label: "เรื่องควรรู้ก่อนเยี่ยมชมเกาะผู้อื่น",
  lead: [
    "การไปเกาะผู้อื่น โดยเฉพาะเกาะที่กำลังแจกของ ขายหัวผักกาด หรือเปิดรับผู้เล่นหลายคนพร้อมกัน ต้องอาศัยความร่วมมือจากผู้เยี่ยมชมทุกคน",
    "อ่านกติกาของเจ้าของเกาะให้ครบ เตรียมตัวก่อนบิน และนึกถึงผู้เล่นคนอื่นที่กำลังรอคิว จะช่วยให้ทุกคนเล่นเกมได้อย่างมีความสุข",
  ],
  alert: {
    title: "สำคัญมากก่อนบิน",
    text: "การบินไปเกาะผู้อื่นผ่านออนไลน์จำเป็นต้องสมัคร Nintendo Switch Online (NSO) และเชื่อมต่ออินเทอร์เน็ตระหว่างเล่น หากยังไม่ได้สมัคร ควรเตรียมให้พร้อมก่อนลงคิวรับของ",
  },
  sections: [
    {
      title: "1. อ่านกฎและกติกาของเจ้าของเกาะให้ละเอียด",
      paragraphs: [
        "เจ้าของเกาะแต่ละคนอาจกำหนดวิธีเข้าคิว พื้นที่ที่เข้าได้ จำนวนของที่รับได้ หรือวิธีติดต่อแตกต่างกัน กรุณาอ่านและปฏิบัติตามเงื่อนไขที่แจ้งไว้",
        "ระหว่างเปิดเกาะ เจ้าของเกาะมักต้องรับข้อความ เช็กคิว และดูแลผู้เยี่ยมหลายคน การอ่านก่อนถามซ้ำช่วยประหยัดเวลาให้ทุกฝ่าย ส่วนเจ้าของเกาะเองก็ควรเขียนกติกาให้ชัดเจนเพื่อลดความสับสน",
      ],
    },
    {
      title: "2. เคลียร์กระเป๋าก่อนบินไปรับของ",
      paragraphs: [
        "หากไปเกาะเพื่อรับของ ควรเคลียร์ช่องเก็บของให้ว่างเท่าที่ทำได้ เพื่อรับของได้ครบในรอบเดียว ไม่ต้องบินกลับไปเก็บของหรือทิ้งสิ่งของระหว่างคิว",
        "การเตรียมกระเป๋าพร้อมช่วยทั้งตัวเรา ผู้ที่ต่อคิว และเจ้าของเกาะที่กำลังรองรับผู้เยี่ยมชม",
      ],
    },
    {
      title: "3. ระหว่างมีคนบิน อย่าเปิดเมนูหรือทำกิจกรรมที่ขวางการเดินทาง",
      paragraphs: [
        "เมื่อมีผู้เล่นกำลังเดินทางเข้าออกเกาะ หลีกเลี่ยงการเปิดกระเป๋า เปิด NookPhone พูดคุยกับชาวเกาะหรือ NPC และซื้อของ เพราะอาจทำให้ผู้เล่นคนอื่นมาเกาะหรือกลับบ้านไม่ได้",
        "ข้อควรระวังนี้ใช้ได้ทั้งเวลามารับของจากเกาะสาธารณะ และเวลาไปเยี่ยมเกาะเพื่อนแบบส่วนตัว",
      ],
    },
    {
      title: "4. รีบไป รีบกลับ และเคารพลำดับคิว",
      paragraphs: [
        "หากเจ้าของเกาะเปิดรับหลายคน จุดประสงค์หลักคือให้ทุกคนทำธุระของตนได้ทันเวลา จึงอาจไม่สะดวกทักทายหรือเล่นด้วยระหว่างแจกของ",
        "ถ้าเจ้าของเกาะแจ้งว่าจะทักหาเมื่อถึงคิว กรุณารอการติดต่อ ไม่จำเป็นต้องส่งข้อความถามซ้ำก่อนถึงคิว เพราะการแจกของหลายคนอาจใช้เวลานานตามจำนวนผู้เล่นและความเร็วในการตอบรับ",
      ],
    },
    {
      title: "5. เช็กอินเทอร์เน็ตก่อนออกเดินทาง",
      paragraphs: [
        "หากการเชื่อมต่อของผู้เล่นคนใดคนหนึ่งไม่เสถียรระหว่างอยู่บนเกาะ ผู้เล่นทุกคนอาจถูกรีเซ็ตกลับไปจุดเริ่มต้นหรือเด้งกลับเกาะของตน ทำให้ของที่เพิ่งหยิบหรือความคืบหน้าบางอย่างต้องเริ่มใหม่",
        "ก่อนรับคิวควรตรวจว่าสัญญาณอินเทอร์เน็ตพร้อมใช้งาน เพื่อลดปัญหากับผู้เล่นคนอื่นและเจ้าของเกาะ",
      ],
    },
    {
      title: "6. ไม่ควรใส่ชุดว่ายน้ำเมื่อเจ้าของเกาะไม่อนุญาต",
      paragraphs: [
        "เจ้าของเกาะที่เปิดแจกของมักกั้นรั้วเพื่อจำกัดพื้นที่ ป้องกันการหยิบของที่ไม่ได้แจก วิ่งทับดอกไม้ เด็ดผลผลิต หรือรบกวนส่วนอื่นของเกาะ",
        "ผู้เล่นที่สวมชุดว่ายน้ำสามารถกระโดดลงน้ำจากบริเวณสนามบินและออกนอกเส้นทางที่กั้นไว้ได้ หากติดอยู่ด้านนอกแล้วกดปุ่มลบเพื่อกลับบ้าน อาจทำให้ผู้เล่นอื่นถูกรีเซ็ตและสูญเสียของที่เพิ่งรับไป",
        "แม้ตั้งใจดี การข้ามพื้นที่ที่เจ้าของเกาะกำหนดก็สร้างความเสียหายได้ จึงควรปฏิบัติตามกติกาเรื่องชุดว่ายน้ำอย่างเคร่งครัด",
      ],
    },
    {
      title: "7. การกลับบ้านและการจัดการเหตุไม่พึงประสงค์",
      paragraphs: [
        "โดยทั่วไป ผู้เยี่ยมชมควรกลับบ้านผ่านสนามบิน ไม่ควรกดปุ่มลบ (-) เพื่อออกจากเกาะเมื่อมีผู้เล่นอื่นอยู่ร่วมเกาะ เพราะอาจกระทบการบันทึกข้อมูลของผู้อื่น",
        "ในกรณีที่เจ้าของเกาะต้องการส่งผู้เยี่ยมทั้งหมดกลับบ้าน สามารถแจ้งให้ทุกคนทราบก่อนใช้คำสั่ง End Session เพื่อให้ระบบส่งผู้เล่นกลับอย่างเป็นระเบียบ",
        "หากมีผู้เยี่ยมชมก่อกวน เจ้าของเกาะสามารถปิดเกมเพื่อยุติเหตุการณ์และบล็อกผู้เล่นคนนั้นได้ แต่การทำเช่นนี้จะกระทบผู้เยี่ยมคนอื่นด้วย จึงใช้เมื่อจำเป็นจริง ๆ",
      ],
    },
    {
      title: "เรื่อง NSO สำหรับผู้เล่นใหม่",
      paragraphs: [
        "ผู้เล่นใหม่บางคนอาจยังไม่ทราบว่าการเดินทางออนไลน์ต้องใช้ NSO เมื่อถึงคิวแล้วจึงเพิ่งพบว่าเดินทางไม่ได้ ทำให้เจ้าของเกาะและคนที่รอคิวต้องเสียเวลา",
        "ก่อนลงชื่อรับของหรือขอไปเยี่ยมเกาะ กรุณาตรวจให้แน่ใจว่าสมัคร NSO และทดลองเชื่อมต่อออนไลน์ได้แล้ว หากยังไม่แน่ใจ ควรถามหรือศึกษาวิธีก่อนเข้าคิว",
      ],
    },
  ],
  checklist: {
    title: "เช็กลิสต์สั้น ๆ ก่อนบิน",
    items: [
      "อ่านกฎของเจ้าของเกาะครบแล้ว",
      "สมัคร NSO และอินเทอร์เน็ตเสถียร",
      "เคลียร์กระเป๋าตามที่จำเป็น",
      "แต่งตัวตามกติกา โดยเฉพาะเรื่องชุดว่ายน้ำ",
      "พร้อมทำธุระให้เสร็จและกลับผ่านสนามบิน",
    ],
  },
  closing:
    "มีน้ำใจ เห็นใจ ใส่ใจ และนึกถึงผู้อื่น การเยี่ยมเกาะก็จะเป็นประสบการณ์ที่ดีสำหรับทุกคน",
};
