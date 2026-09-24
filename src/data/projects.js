// Add/edit projects here. Each one gets a card on the homepage
// and its own case-study page at /work/:slug.
import project1Cover from '../Assests/Cover for project one.webp'
import project2Cover from '../Assests/Cover for project two.webp'
import problemSolutionBoard from '../Assests/Problem-Solution.webp'
import proposedUxStrategyBoard from '../Assests/Proposed-UX-Strategy.webp'
import primaryUserNeedsBoard from '../Assests/Primary-User-Needs.webp'
import whatIReviewedBoard from '../Assests/Competitive-Research-Intro.webp'
import competitiveSnapshotBoard from '../Assests/Competitive-Snapshot.webp'
import designNewArrivals from '../Assests/Home Page_1.webp'
import designAddToCart from '../Assests/add to cart.webp'
import dashboardComponents from '../Assests/Compenents.webp'
import mainDashboard from '../Assests/Main Dashboard.webp'
import levelBased from '../Assests/Level Based.webp'
import chatDesign from '../Assests/Chat.webp'
import fileUpload from '../Assests/File Upload.webp'
import sliderOrderDetails from '../Assests/Slider/Order details-web.webp'
import sliderOrderInformation from '../Assests/Slider/Order Information-web.webp'
import sliderCourseOrdered from '../Assests/Slider/course ordered-web.webp'
import sliderReturnOrderInformation from '../Assests/Slider/Return Order Information-web.webp'
import sliderReturnOrderDetails from '../Assests/Slider/Return Order Details-web.webp'
import sliderCourseReturn from '../Assests/Slider/Course Return-web.webp'
import sliderTotalSchoolRegistered from '../Assests/Slider/total school registered-web.webp'
import sliderSchoolDetails from '../Assests/Slider/School details-web.webp'
import sliderSchoolActivity from '../Assests/Slider/School activity-web.webp'
import sliderSchoolProgress from '../Assests/Slider/School progress-web.webp'
import sliderAccountDetails from '../Assests/Slider/Account details-web.webp'
import sliderNotificationHamburg from '../Assests/Slider/Notification hamburg-web.webp'
import legacyImage1 from '../Assests/Slider2/Image 1-web.webp'
import legacyImage2 from '../Assests/Slider2/Image 2-web.webp'
import legacyImage3 from '../Assests/Slider2/Image 3-web.webp'
import legacyImage4 from '../Assests/Slider2/Image 4-web.webp'
import legacyImage5 from '../Assests/Slider2/Image 5-web.webp'
import legacyImage6 from '../Assests/Slider2/Image 6-web.webp'
import legacyImage7 from '../Assests/Slider2/Image 7-web.webp'
import legacyImage8 from '../Assests/Slider2/Image 8-web.webp'
import project3Cover from '../Assests/Cover for project three.webp'
import project4Cover from '../Assests/Cover for project four.webp'
import p4SignIn from '../Assests/sign - in.webp'
import p4HomeScreen from '../Assests/Home screen.webp'
import p4LabTrends from '../Assests/Lab Trends.webp'
import p4PduMonitoring from '../Assests/PDU Monitoring.webp'
import p4Alerts from '../Assests/Alerts.webp'
import markAbHero from '../Assests/Mark AB-1-web.webp'
import markAbHomepage from '../Assests/Mark AB-2-web.webp'

export const projects = [
  {
    slug: 'project-one',
    title: 'Braindemics Admin Panel',
    cardLabel: 'Braindemics',
    category: 'Admin Panel',
    tagline: 'Big Bang creations',
    cardHeadline: 'Rebuilding Braindemics, One Admin Panel at a Time',
    role: 'UI/UX Designer',
    year: '2025',
    duration: '8 weeks',
    tags: ['UI/UX Design', 'Dashboard Design'],
    cover: project1Cover,
    overview: '',
    sections: [
      {
        layout: 'row',
        items: [
          {
            heading: 'Overview',
            blocks: [
              {
                type: 'paragraph',
                text: "Braindemics curates learning kits, videos, and PDFs for schools across three levels Beginner, Masters, and Explorer. The student-facing product looked polished. Behind it, the internal team was running the entire operation on spreadsheets, shared drives, and WhatsApp threads.",
              },
              {
                type: 'paragraph',
                text: "I designed a centralized Admin Panel to give that team one place to manage schools, push content live, and see who's actually keeping up.",
              },
            ],
          },
          {
            heading: 'My Role',
            blocks: [
              {
                type: 'paragraph',
                text: "UI/UX Designer. I owned the process end to end: mapping user flows, running stakeholder interviews, and shipping high-fidelity screens. The hardest part wasn't the interface it was making sure a file an admin uploaded actually reached the right school, at the right level, without anyone having to chase it down.",
              },
            ],
          },
        ],
      },
      {
        heading: 'Redesign Outcomes',
        blocks: [
          {
            type: 'stats',
            items: [
              { stat: '90% Faster', label: 'Content upload workflow for the backend team' },
              {
                stat: '1 System',
                label: 'Replacing four disconnected tools spreadsheets, shared drives, email, WhatsApp with a single source of truth',
              },
              {
                stat: '3 Levels, 1 Login',
                label: "Every school now sees only the content tied to its assigned level",
              },
            ],
          },
        ],
      },
      {
        heading: 'Discovery',
        blocks: [
          {
            type: 'image',
            src: dashboardComponents,
            alt: 'Dashboard overview',
          },
          {
            type: 'paragraph',
            text: "Braindemics needed to manage school data, learning content, and teacher progress and was doing it with spreadsheets, shared drives, and manual check-ins. There was no real-time visibility into what any school was actually doing, and the approval process for unlocking next month's content was entirely manual, so schools simply waited.",
          },
          {
            type: 'paragraph',
            text: "It wasn't a visual problem. It was an operations problem wearing a UI costume. The fix needed to centralize control, automate approvals based on real progress, and give everyone admins, teachers, coordinators one current view of where things stood.",
          },
        ],
      },
      {
        heading: 'User Research',
        subheading: 'Listening Before Building',
        blocks: [
          {
            type: 'paragraph',
            text: "Four one-on-one conversations with the Braindemics team content, support, logistics surfaced the daily friction firsthand. A survey of 15 teachers using the platform added the other side: what content access, approvals, and communication looked like from their seat. I sat in on how admin staff actually handled onboarding and uploads day to day, and looked at how Khan Academy and Byju's structured content and roles for ideas on what a non-technical-friendly system could look like.",
          },
          {
            type: 'paragraph',
            text: 'What that turned up:',
          },
          {
            type: 'list',
            items: [
              'Teachers wanted content organized by level and subject, not one long list',
              'The monthly approval process was manual, slow, and blocked schools from moving forward',
              'Admins were juggling four separate tools just to keep schools running',
              'Teachers had no reliable channel to reach admins mid-lesson',
              'Non-technical coordinators needed something that required zero training',
              'No one could see kit delivery or return status without asking around',
            ],
          },
        ],
      },
      {
        heading: 'Design',
        subheading: 'One Panel To Run It All',
        blocks: [
          {
            type: 'image',
            src: mainDashboard,
            alt: 'Add school details',
          },
          {
            type: 'paragraph',
            text: 'I built the panel around three ideas: centralize everything admins touch, automate what used to require a person, and keep it simple enough that a non-technical coordinator never needs a walkthrough.',
          },
          {
            type: 'feature',
            heading: 'Level-based content, not a wall of links.',
            text: 'Videos and PDFs upload into three sections Beginner, Masters, Explorer and sync straight to the schools cleared for that level.',
          },
          {
            type: 'image',
            src: levelBased,
            alt: 'Upload media file',
          },
          {
            type: 'feature',
            heading: 'Progress gates the next month, automatically.',
            text: "Teachers can't request next month's content until they hit 100% on the current one. Admins get notified the moment a request comes in and can approve or reject it in a click no more chasing spreadsheets to check readiness.",
          },
          {
            type: 'feature',
            heading: 'Every school gets its own door.',
            text: "A unique login means teachers only ever see the content assigned to their school's level less confusion, less risk of the wrong material reaching the wrong classroom.",
          },
          {
            type: 'feature',
            heading: 'A chat that replaces WhatsApp.',
            text: 'Teachers message admins directly from their dashboard instead of losing a question in an email thread.',
          },
          {
            type: 'image',
            src: chatDesign,
            alt: 'Messaging and scheduling',
          },
          {
            type: 'feature',
            heading: "Kit tracking that doesn't need a phone call.",
            text: 'A built-in order and return tracker shows exactly which schools have received kits and which still owe one back.',
          },
        ],
      },
      {
        heading: 'Impact',
        subheading: 'Faster Uploads, Fewer Fires',
        blocks: [
          {
            type: 'image',
            src: fileUpload,
            alt: 'Progress dashboard',
          },
          {
            type: 'paragraph',
            text: 'The redesign cut the backend team\'s content upload workflow by 90%. More importantly, it replaced four disconnected tools with one system of record the fragmented spreadsheet-and-WhatsApp workflow that started this project is gone. Progress-based approvals removed a manual bottleneck entirely, and real-time messaging gave teachers a channel that didn\'t depend on someone checking their email.',
          },
          {
            type: 'table',
            headers: ['Area', 'Before', 'After', 'Outcome'],
            rows: [
              [
                'School Management',
                'Multiple disconnected actions',
                'Centralized school management',
                'Easier administration',
              ],
              [
                'Content Upload',
                'Manual and unclear workflow',
                'Structured upload flow',
                'Faster content management',
              ],
              [
                'Teacher Progress',
                'Difficult to track approval status',
                'Clear progress & approval states',
                'Better visibility',
              ],
              [
                'Order Tracking',
                'Limited tracking visibility',
                'Delivery & return-kit tracking',
                'Improved coordination',
              ],
              [
                'Communication',
                'Communication outside the system',
                'Built-in teacher-admin chat',
                'Reduced context switching',
              ],
            ],
          },
        ],
      },
      {
        heading: 'More Screens',
        blocks: [
          {
            type: 'marquee',
            speed: 90,
            images: [
              sliderOrderDetails,
              sliderOrderInformation,
              sliderCourseOrdered,
              sliderReturnOrderInformation,
              sliderReturnOrderDetails,
              sliderCourseReturn,
              sliderTotalSchoolRegistered,
              sliderSchoolDetails,
              sliderSchoolActivity,
              sliderSchoolProgress,
              sliderAccountDetails,
              sliderNotificationHamburg,
            ],
          },
        ],
      },
      {
        heading: 'Reflection',
        subheading: 'What This Taught Me',
        blocks: [
          {
            type: 'feature',
            heading: 'A well-structured system saves more than time it saves trust.',
            text: 'Once admins stopped losing files in spreadsheets, they stopped double-checking everything, which mattered more than any visual polish did.',
          },
          {
            type: 'feature',
            heading: 'Locking progress behind completion works.',
            text: 'Once teachers knew next month depended on finishing this one, completion stopped being something anyone had to nag about.',
          },
          {
            type: 'feature',
            heading: 'Simple beats capable, for non-technical users.',
            text: 'Every choice that added a dropdown or a status badge did more for adoption than any feature that added power but asked more of the user.',
          },
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'project-two',
    title: 'Classic Legacy',
    cardLabel: 'Classic Legacy',
    category: 'E-Commerce',
    tagline: 'Building a Brand From Zero',
    cardHeadline: 'A Responsive Shopping Experience for Classic Legacy',
    role: 'UI/UX Designer',
    year: '2025',
    duration: '3 months (2 months research & design, 1 month development)',
    tags: ['E-Commerce', 'Responsive Design'],
    cover: project2Cover,
    liveUrl: 'https://classiclegacy.in/',
    overview: '',
    sections: [
      {
        layout: 'row',
        items: [
          {
            heading: 'Overview',
            blocks: [
              {
                type: 'paragraph',
                text: 'Classic Legacy is an apparel brand from SKC Garments, a 30-year manufacturer, launching direct-to-consumer for the first time. Big Bang Creations built the brand identity from the ground up logo, packaging, and marketing collateral and I owned full UX and UI design for the website that would carry all of it.',
              },
            ],
          },
          {
            heading: 'My Role',
            blocks: [
              {
                type: 'paragraph',
                text: 'UI/UX Designer at Big Bang Creations. I owned end-to-end UX and UI for classiclegacy.in from structuring the site around the new brand system to designing every page that shipped.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Outcomes',
        blocks: [
          {
            type: 'stats',
            items: [
              { stat: '0 → 1', label: 'No prior website launched a fully functioning e-commerce brand end to end' },
              { stat: '3 Months', label: 'From first brief to live launch, covering research, design, and development' },
              { stat: 'One System', label: 'A single visual identity carried consistently from logo to packaging to product page' },
            ],
          },
        ],
      },
      {
        heading: 'Problem',
        hideHeading: true,
        blocks: [
          {
            type: 'image',
            src: problemSolutionBoard,
            alt: 'Problem and solution research board',
          },
        ],
      },
      {
        heading: 'Primary User Needs',
        blocks: [
          {
            type: 'image',
            src: primaryUserNeedsBoard,
            alt: 'Primary user needs board',
          },
        ],
      },
      {
        heading: 'Process',
        subheading: 'Competitive Research',
        blocks: [
          {
            type: 'paragraph',
            text: 'Since Classic Legacy did not have an existing website, I started by understanding how similar apparel and activewear brands present their products online.',
          },
          {
            type: 'paragraph',
            text: 'The goal was not to copy competitor websites, but to identify common patterns, understand what helps customers make purchase decisions, and find opportunities for Classic Legacy to build a stronger first digital experience.',
          },
          {
            type: 'paragraph',
            text: 'I conducted a comparative review of the three competitor websites, focusing on the key moments in a typical shopping journey:',
          },
          {
            type: 'paragraph',
            text: '**Discover → Explore → Evaluate → Choose → Purchase**',
          },
          {
            type: 'image',
            src: whatIReviewedBoard,
            alt: 'What I reviewed board',
          },
          {
            type: 'image',
            src: competitiveSnapshotBoard,
            alt: 'Competitive snapshot board',
          },
        ],
      },
      {
        heading: 'Key Insights',
        blocks: [
          {
            type: 'subhead',
            text: '01. Discovery',
          },
          {
            type: 'feature',
            heading: "The catalogue shouldn't feel like a catalogue.",
            text: 'Users should be able to discover products based on: Need + Occasion + Style + Comfort + Fit.',
          },
          {
            type: 'subhead',
            text: '02. Decision',
          },
          {
            type: 'feature',
            heading: 'Show users why a product is right for them.',
            text: 'Not just "What is this product?" but "Is this the right product for me?"',
          },
          {
            type: 'subhead',
            text: '03. Fit',
          },
          {
            type: 'feature',
            heading: 'Fit is a confidence problem.',
            text: 'Give users useful information around: Size, Fit, Fabric, Stretch, Comfort, Use case.',
          },
          {
            type: 'subhead',
            text: '04. Trust',
          },
          {
            type: 'feature',
            heading: 'Classic Legacy is new to the digital shopper.',
            text: 'The website needs to introduce: Who we are → What we make → How we make it → Why it matters.',
          },
          {
            type: 'subhead',
            text: '05. Differentiation',
          },
          {
            type: 'feature',
            heading: 'The website shouldn\'t compete only on price and discount.',
            text: 'It should communicate: Quality + Manufacturing Expertise + Comfort + Reliability.',
          },
          {
            type: 'subhead',
            text: 'Design Direction',
          },
          {
            type: 'paragraph',
            text: '**"Find what fits your life."**',
          },
          {
            type: 'paragraph',
            text: 'The new Classic Legacy website should help customers:',
          },
          {
            type: 'list',
            items: [
              'Find the right product',
              'Understand what makes it different',
              'Choose the right size & fit',
              'Trust the brand',
              'Buy with confidence',
            ],
          },
          {
            type: 'subhead',
            text: 'Final Opportunity',
          },
          {
            type: 'paragraph',
            text: "Build Classic Legacy's first digital experience around the **customer**, not just the **catalogue**.",
          },
          {
            type: 'paragraph',
            text: 'From "Here are our products." To "Here\'s how we can help you find the right one."',
          },
        ],
      },
      {
        heading: 'Proposed UX Strategy',
        blocks: [
          {
            type: 'image',
            src: proposedUxStrategyBoard,
            alt: 'Proposed UX strategy board',
          },
        ],
      },
      {
        heading: 'Design',
        blocks: [
          {
            type: 'image',
            src: designNewArrivals,
            alt: 'New Arrivals and product detail page design',
          },
          {
            type: 'paragraph',
            text: 'I structured the site around five decisions:',
          },
          {
            type: 'feature',
            heading: 'A video-first homepage.',
            text: 'Autoplaying product videos instead of static banners, so the first thing a visitor sees is the product in motion, not a still image.',
          },
          {
            type: 'feature',
            heading: 'Manufacturing credibility, up front.',
            text: 'Sustainability stats recycled fabric percentage, certified non-toxic dyes sit right under the hero, turning factory-level credentials into a trust signal before a visitor ever reaches a product page.',
          },
          {
            type: 'video',
            src: 'https://classiclegacy.in/cdn/shop/videos/c/vp/31163b329c08421dae67797108f67b97/31163b329c08421dae67797108f67b97.HD-1080p-7.2Mbps-79457793.mp4',
            alt: 'Classic Legacy homepage banner video',
          },
          {
            type: 'feature',
            heading: 'Merchandised collections, not a flat catalog.',
            text: "Dedicated Best Sellers and New Arrivals rails with color-variant product cards, so browsing doesn't depend on digging through category menus.",
          },
          {
            type: 'image',
            src: designAddToCart,
            alt: 'Cart flyout after adding a product',
          },
          {
            type: 'feature',
            heading: 'A heritage story built into the homepage.',
            text: 'The "30 years of craftsmanship" narrative sits in the main scroll instead of being buried on a separate About page the brand\'s only real point of difference, made visible where people would actually see it.',
          },
          {
            type: 'feature',
            heading: 'Low-friction paths to convert or come back.',
            text: 'A WhatsApp click-to-chat for quick questions, and a newsletter signup with a 15%-off incentive for first-time visitors.',
          },
        ],
      },
      {
        heading: 'Look & Feel',
        blocks: [
          {
            type: 'marquee',
            speed: 55,
            images: [
              legacyImage1,
              legacyImage2,
              legacyImage3,
              legacyImage4,
              legacyImage5,
              legacyImage6,
              legacyImage7,
              legacyImage8,
            ],
          },
        ],
      },
      {
        heading: 'Reflection',
        blocks: [
          {
            type: 'feature',
            heading: 'Watching how customers actually buy.',
            text: 'Seeing the full purchase journey come together browse, cart, checkout taught me more about commerce design than any single screen could on its own.',
          },
          {
            type: 'feature',
            heading: 'Building a payment gateway for the first time.',
            text: 'Wiring up checkout and payments was new territory for me, and it turned into one of the most genuinely interesting parts of the build.',
          },
          {
            type: 'feature',
            heading: 'Categorization was more engaging than expected.',
            text: 'Structuring how products were grouped and organized ended up being one of the most interesting design problems in the whole project.',
          },
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'project-three',
    title: 'Mark AB Capital',
    cardLabel: 'Mark AB Capital',
    category: 'Website Redesign',
    tagline: 'A Trust-First Redesign for a Global Investment Firm',
    cardHeadline: 'Rebuilding Mark AB Capital Into a Site Investors Trust',
    role: 'UI/UX Designer',
    year: '2025',
    tags: ['UI/UX Design', 'Responsive Design'],
    cover: project3Cover,
    liveUrl: 'https://www.markabcapital.net/',
    overview: '',
    sections: [
      {
        layout: 'row',
        items: [
          {
            heading: 'Overview',
            blocks: [
              {
                type: 'paragraph',
                text: "Mark AB Capital is a globally trusted investment firm whose website hadn't kept pace with its ambitions an outdated UI, weak visual hierarchy, and no responsive support undermined the credibility it needed to project to investors and partners.",
              },
              {
                type: 'paragraph',
                text: 'I led a full redesign to clarify content, rebuild the visual identity, and make the site work confidently across every device.',
              },
            ],
          },
          {
            heading: 'My Role',
            blocks: [
              {
                type: 'paragraph',
                text: 'UI/UX Designer. I owned the redesign end to end auditing the existing site, running competitive research, and designing a responsive UI built around trust, clarity, and ease of navigation for institutional investors and high-net-worth users.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Challenges',
        blocks: [
          {
            type: 'paragraph',
            text: "The website had important usability issues. It featured an outdated UI with a weak visual hierarchy. The content was poorly structured, which confused users about the services and strategy. Additionally, it was not responsive, making navigation difficult on smaller screens and failing to represent the firm's credibility.",
          },
          {
            type: 'subhead',
            text: 'Understanding the Problems',
          },
          {
            type: 'paragraph',
            text: "We analyzed the existing website by reviewing user behaviour, content structure, and competitors. Users struggled to find key information due to cluttered layouts, unclear navigation, and inconsistent content. Critical sections like investment strategy and contact details were hard to access, and the lack of trust-building visuals failed to engage the firm's target audience of investors and partners.",
          },
        ],
      },
      {
        heading: 'Problem',
        hideHeading: true,
        blocks: [
          {
            type: 'image',
            src: markAbHero,
            alt: 'Mark AB Capital redesigned homepage hero',
          },
        ],
      },
      {
        heading: 'Outcomes',
        blocks: [
          {
            type: 'stats',
            items: [
              {
                stat: 'Clear Navigation',
                label: 'Reorganized information architecture so key pages surface instantly',
              },
              {
                stat: 'Mobile-First',
                label: 'Fully responsive layouts built for on-the-go investors',
              },
              {
                stat: 'Trust Signals',
                label: 'Metrics, credibility cues, and global presence highlighted throughout',
              },
            ],
          },
        ],
      },
      {
        heading: 'Design',
        subheading: 'A User-Centered Approach',
        blocks: [
          {
            type: 'image',
            src: markAbHomepage,
            alt: 'Mark AB Capital redesigned About Us section',
          },
          {
            type: 'paragraph',
            text: "We focused on improving navigation, content clarity, and visual hierarchy. The site structure was reorganized to align with user needs, and a clean, responsive UI was designed to reflect the firm's credibility and support access across all devices. Every design choice was guided by the goal of building trust with institutional investors and high-net-worth users.",
          },
          {
            type: 'list',
            items: [
              'Use subtle micro-interactions to enhance usability without distracting from the content',
              "Maintain brand consistency through typography, color, and iconography aligned with the firm's identity",
            ],
          },
          {
            type: 'feature',
            heading: 'Navigation rebuilt for discoverability.',
            text: 'Redesigned the website with proper navigation so investors and partners can find what they need.',
          },
          {
            type: 'feature',
            heading: 'Business metrics up front.',
            text: "Highlighted business metrics and the firm's global presence prominently on the homepage.",
          },
          {
            type: 'feature',
            heading: 'Typography that scans.',
            text: 'Used clean typography and structured layouts for better scannability.',
          },
          {
            type: 'feature',
            heading: 'Modular content blocks.',
            text: 'Broke down complex financial information into modular, digestible blocks.',
          },
        ],
      },
      {
        heading: 'Reflection',
        subheading: 'What I Learned',
        blocks: [
          {
            type: 'paragraph',
            text: 'I undertook a comprehensive redesign of the Mark AB Capital website to enhance its professionalism, usability, and mobile compatibility. The primary objective was to facilitate swift access to essential information for investors and partners while fostering trust in the brand my efforts focused on clean layouts, intuitive navigation, and a responsive design that performs effectively across every device.',
          },
          {
            type: 'list',
            items: [
              'Keep designs clean and easy to understand',
              'Content hierarchy drives user clarity',
              'Good layout helps users find information quickly',
              'Small UX details have big impact',
            ],
          },
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'project-four',
    title: 'Energy Management System',
    cardLabel: 'Energy Management System',
    category: 'Dashboard Design',
    tagline: 'Reducing Energy Waste by 32% Across a 14-Building Portfolio',
    cardHeadline: 'Turning a Data-Heavy Industrial Dashboard Into a Tool Engineers Actually Use',
    role: 'UX Designer',
    year: '2026',
    duration: '6 months',
    tags: ['UX Design', 'Dashboard Design'],
    cover: project4Cover,
    overview: '',
    sections: [
      {
        layout: 'row',
        items: [
          {
            heading: 'Overview',
            blocks: [
              {
                type: 'paragraph',
                text: 'Energy management systems are notoriously difficult to use well. They sit at the intersection of industrial engineering, real-time data, and high-stakes decision-making, yet the interfaces that power them are often built by engineers for engineers leaving facility managers and sustainability leads drowning in numbers with no clear path to action.',
              },
              {
                type: 'paragraph',
                text: 'This case study documents the end-to-end UX process behind redesigning an EMS platform for a global-sized American technology company managing 14 buildings across the Asia-Pacific region (APAC).',
              },
            ],
          },
          {
            heading: 'My Role',
            blocks: [
              {
                type: 'paragraph',
                text: "UX Designer. I led the process end to end research, synthesis, design, and validation over a 6-month engagement, conducting 18 stakeholder interviews and running six rounds of usability testing across 18 participants to redesign how facility managers, building engineers, and sustainability directors interact with energy data.",
              },
            ],
          },
        ],
      },
      {
        heading: 'Outcomes',
        blocks: [
          {
            type: 'stats',
            items: [
              {
                stat: '32% Less Waste',
                label: 'Reduction in energy waste after rollout across all 14 buildings',
              },
              {
                stat: '2x Faster',
                label: 'Response time to flagged issues',
              },
              {
                stat: '14 Buildings',
                label: 'Rolled out across the APAC portfolio over seven months',
              },
            ],
          },
        ],
      },
      {
        heading: 'Problem',
        subheading: 'Why the Old System Failed',
        blocks: [
          {
            type: 'paragraph',
            text: 'The existing system was technically capable but operationally ignored: alarms went unacknowledged, energy consumption spikes went unnoticed for days, and sustainability reporting was done manually in spreadsheets.',
          },
          {
            type: 'note',
            text: '"The system shows us everything happening in the building but we only understand it when something goes wrong." Facility Manager, Client Interview',
          },
          {
            type: 'paragraph',
            text: 'Before redesigning, I mapped the failure modes of the existing platform through stakeholder interviews, contextual inquiry sessions, and three months of system logs. Five major issues emerged.',
          },
        ],
      },
      {
        heading: 'Research',
        subheading: 'Understanding the People Behind the Screens',
        blocks: [
          {
            type: 'paragraph',
            text: 'I conducted 18 in-depth interviews across three role types facility managers, building engineers, and sustainability directors. Each had fundamentally different mental models, goals, and levels of technical fluency, which meant one interface could not serve everyone equally well.',
          },
          {
            type: 'subhead',
            text: 'Three Roles, Three Timescales',
          },
          {
            type: 'paragraph',
            text: 'A critical insight from the research: the three roles interact with energy data at completely different time scales.',
          },
          {
            type: 'list',
            items: [
              "**Facilities Manager:** Needs a real-time view is everything running properly, what's wrong today.",
              '**Building Engineer:** Needs a recent-past view what caused this.',
              '**Sustainability Director:** Needs a months-to-years view are we on track toward our targets?',
            ],
          },
        ],
      },
      {
        heading: 'Design',
        subheading: 'Rethinking the System Structure',
        blocks: [
          {
            type: 'paragraph',
            text: "The biggest change I made wasn't visual it was structural. The system was originally organized around technical categories like HVAC, lighting, power, and water. That made sense from a system perspective, but it didn't match how people actually worked.",
          },
          {
            type: 'paragraph',
            text: "So I redesigned it around roles instead. Rather than navigating through system types, the interface now adapts based on who's using it a facilities manager, an operator, and a sustainability lead each see the same underlying data, structured around their own responsibilities.",
          },
          {
            type: 'feature',
            heading: 'The Facilities Manager dashboard.',
            text: 'Built around six rounds of usability testing with 18 participants, iterating on information density, color theory, and alert hierarchy.',
          },
          {
            type: 'feature',
            heading: "The Engineer's dashboard.",
            text: 'A recent-past view focused on root cause, not just current state what caused this, not just what is wrong.',
          },
          {
            type: 'feature',
            heading: "The Sustainability Director's dashboard.",
            text: 'A longer-horizon view built around progress toward targets, not day-to-day operations.',
          },
        ],
      },
      {
        heading: 'More Screens',
        blocks: [
          {
            type: 'marquee',
            speed: 70,
            images: [p4SignIn, p4HomeScreen, p4LabTrends, p4PduMonitoring, p4Alerts],
          },
        ],
      },
      {
        heading: 'Reflection',
        subheading: 'Results After Six Months',
        blocks: [
          {
            type: 'paragraph',
            text: 'The redesigned EMS platform was rolled out across all 14 buildings over seven months, with results measured against the baseline metrics defined during the research phase.',
          },
          {
            type: 'note',
            text: '"For the first time, I open the dashboard in the morning and actually know what I need to do. That\'s all I ever wanted." Facilities Manager, post-launch survey',
          },
          {
            type: 'paragraph',
            text: 'This case study covers research, synthesis, design, and validation conducted over a 6-month engagement. Names and specific metrics have been adjusted to protect client confidentiality; the design system and interface patterns described here are my original work.',
          },
        ],
      },
    ],
    links: [],
  },
]
