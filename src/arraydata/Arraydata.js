import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";

export const Faqq = [
  {
    question: "How do I get started with Algo Today?",
    answer:
      "Getting started with Algo Today is easy! Simply sign up for an account on our website, choose your subscription plan, and start exploring our intuitive interface to deploy algorithms and begin trading.",
  },
  {
    question: "Do I need a lot of money to start trading?",
    answer:
      "Nope, you can start with any amount you want! You don't need a big deposit to get going. We want everyone to have the chance to trade, no matter how much money they have.",
  },
  {
    question: "How reliable are your algorithms?",
    answer:
      "Our algorithms are rigorously tested and continuously optimized to ensure reliability and effectiveness. While no trading strategy is guaranteed to be successful, our algorithms are designed to adapt to changing market conditions and deliver consistent results over time.",
  },
  {
    question:
      "How much money will I have after 2 years of trading with algorithms?",
    answer:
      "What you’re talking about here is the compounding effect! The compounding effect means your money earns more money over time. So, in trading, it's not just about making money on your initial investment, but also about letting those profits work for you to make even more money.",
  },
  {
    question: "How is AlgoToday different?",
    answer:
      "Are you someone who is willing to enter the stock market, but is unsure about your decision? You see websites promise you amazing returns, but pay peanuts? Algotoday is an NISM certified website. We help you make bold investment decisions without manual error.",
  },
  {
    question: "How should I select a strategy for my trade?",
    answer:
      "Once you've signed up for a plan, you gain access to the Choose Strategy section, where you can pick from our top-tier Algo Strategies crafted by industry experts.You may choose a strategy based on your knowledge about the stock market. Beginners need experts to help, whereas seasonal traders need a custom strategy.",
  },
];

export const numberData = [
  {
    datano: "40+",
    value: "Integrations",
  },
  {
    datano: "600%",
    value: "Return on investment",
  },
  {
    datano: "4K+",
    value: "Global customers",
  },
];

export const footerData = [
  {
    img: (
      <img
        src={require("../assets/icons/upscaler-1.png")}
        alt="image"
        className="logooo-imagee"
      />
    ),
    para: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    icon1: <RxTwitterLogo />,
    icon2: <FiFacebook />,
    icon3: <FaInstagram />,
  },
  {
    Company: "Company",
    About: "About",
    Features: "Features",
    Works: "Works",
    Career: "Career",
  },
  {
    Help: "Help",
    CustomerSupport: "CustomerSupport",
    DeliveryDetails: "DeliveryDetails",
    TermsConditions: "Terms & Conditions",
    PrivacyPolicy: "PrivacyPolicy",
  },
  {
    Resources: "Resources",
    FreeeBooks: "FreeeBooks",
    DevelopmentTutorial: "Development Tutorial",
    HowtoBlog: "HowtoBlog",
    YoutubePlaylist: "YoutubePlaylist",
  },
  {
    InstallApp: "Install App",
    img1: <img src={require("../assets/icons/App Store.png")} />,
    img2: <img src={require("../assets/icons/Play Store.png")} />,
  },
  {
    copyRight: "© Copyright 2022, All Rights Reserved by Algo Trading",
  },
];

export const sliderData = [
  {
    img: <img className="imagee" src={require("../assets/icons/userimg.png")} />,
    text1: "Raghav",
    // para1: "Lead Intranet Technician",
    para2:
      "Using this algotrading app has given me more time to enjoy life. I don’t have to constantly monitor the markets, and I still see great results!.",
  },
  {
    img: <img className="imagee" src={require("../assets/icons/Group 48095916.png")} />,
    text1: "Sarvesh",
    // para1: "Lead Intranet Technician",
    para2:
      "I've tried several trading apps, but this one stands out. The algorithms really seem to pick up on trends I would have missed. It’s made a real difference.",
  },
  {
    img: <img className="imagee" src={require("../assets/icons/Group 48095916.png")} />,
    text1: "Sarvesh",
    // para1: "Lead Intranet Technician",
    para2:
      "I've tried several trading apps, but this one stands out. The algorithms really seem to pick up on trends I would have missed. It’s made a real difference.",
  },
  {
    img: <img className="imagee" src={require("../assets/icons/Group 48095916.png")} />,
    text1: "Sarvesh",
    // para1: "Lead Intranet Technician",
    para2:
      "I've tried several trading apps, but this one stands out. The algorithms really seem to pick up on trends I would have missed. It’s made a real difference.",
  },
];

export const aboutcardData = [
  {
    text1: "Precision Through Data-Driven Insights",
    para1:
      "Success in trading hinges on informed decisions. Our sophisticated algorithms ensure that trading actions are guided by objective analysis, fostering a disciplined approach free from the unpredictability of human emotions.",
  },
  {
    text1: "Seize Opportunities with Automated Excellence",
    para1:
      "Our cutting-edge automated trading solutions are designed to enhance performance by minimizing risk and maximizing growth potential. By removing emotional influences, we enable users to efficiently capitalize on market opportunities, cultivating a systematic investment strategy.",
  },
  {
    text1: "Transparency You Can Trust",
    para1:
      "We prioritize open communication and comprehensive insights into our trading strategies and performance metrics. This unwavering commitment to transparency fosters trust within our investment community, empowering users to make informed decisions confidently.",
  },
  {
    text1: "Empowering Investors with User-Centric Innovation",
    para1:
      "Our user-friendly platform caters to both seasoned traders and newcomers, providing a professional environment for all. We aim to cultivate a space where individuals can achieve financial independence and peace of mind, transforming the investment experience.",
  },
];

export const strategiesData = {
  box1: {
    title: "Strategy - 1",
    details: "Detailed information about Strategy 1.",
    parameters: [
      { name: "trace_candle", type: "number", placeholder: "Trace Candle" },
      { name: "close", type: "text", placeholder: "Close" },
      { name: "high", type: "text", placeholder: "High" },
      { name: "low", type: "text", placeholder: "Low" },
      { name: "open", type: "text", placeholder: "Open" },
      {
        name: "buying_multiplier",
        type: "number",
        placeholder: "Buying Multiplier",
      },
      {
        name: "stop_loss_multiplier",
        type: "number",
        placeholder: "Stop Loss Multiplier",
      },
      {
        name: "sl_low_multiplier_1",
        type: "number",
        placeholder: "Sl Low Multiplier",
      },
      {
        name: "sl_low_multiplier_2",
        type: "number",
        placeholder: "Sl Low Multiplier 2",
      },
      { name: "trail_sl_1", type: "number", placeholder: "Trail Sl 1" },
      { name: "trail_sl_2", type: "number", placeholder: "Trail Sl 2" },
      {
        name: "modify_stop_loss_1",
        type: "number",
        placeholder: "Modify Stop Loss 1",
      },
      {
        name: "modify_stop_loss_2",
        type: "number",
        placeholder: "Modify Stop Loss 2",
      },
    ],
  },
  box2: {
    title: "Strategy - 2",
    details: "Detailed information about Strategy 2.",
    parameters: [
      { name: "trace_candle", type: "number", placeholder: "Trace Candle" },
      { name: "close", type: "text", placeholder: "Close" },
      {
        name: "stop_loss_multiplier",
        type: "number",
        placeholder: "Stop Loss Multiplier",
      },
    ],
  },
  box3: {
    title: "Strategy - 3",
    details: "Detailed information about Strategy 3.",
  },
  box4: {
    title: "Strategy - 4",
    details: "Detailed information about Strategy 4.",
  },
  box5: {
    title: "Strategy - 5",
    details: "Detailed information about Strategy 5.",
  },
  box6: {
    title: "Strategy - 6",
    details: "Detailed information about Strategy 6.",
  },
  box7: {
    title: "Strategy - 7",
    details: "Detailed information about Strategy 7.",
  },
  box8: {
    title: "Strategy - 8",
    details: "Detailed information about Strategy 8.",
  },
};

export const buyingConditionData = {
  condition1: {
    id: "1",
    title: "OHLC Compare",
    details: "Detailed information about Strategy 1.",
    parameters: [
      { name: "Multiplier", type: "text", placeholder: "Multiplier" },
      {
        name: "OHLC",
        type: "select",
        options: [
          { value: "Open", label: "Open" },
          { value: "High", label: "High" },
          { value: "Close", label: "Close" },
          { value: "Low", label: "Low" },
        ],
      },
      {
        name: "MIN",
        type: "select",
        options: [
          { value: "1 Minute", label: "1 Minute" },
          { value: "2 Minute", label: "2 Minute" },
          { value: "3 Minute", label: "3 Minute" },
          { value: "4 Minute", label: "4 Minute" },
        ],
      },
      {
        name: "1",
        type: "select",
        options: [
          { value: "1 ", label: "1 " },
          { value: "2 ", label: "2 " },
          { value: "3 ", label: "3 " },
          { value: "4 ", label: "4 " },
        ],
      },
      {
        name: ">",
        type: "select",
        options: [
          { value: "> ", label: "> " },
          { value: "< ", label: "< " },
        ],
      },
      { name: "Multiplier", type: "text", placeholder: "Multiplier" },
      {
        name: "OHLC",
        type: "select",
        options: [
          { value: "Open", label: "Open" },
          { value: "High", label: "High" },
          { value: "Close", label: "Close" },
          { value: "Low", label: "Low" },
        ],
      },
      {
        name: "MIN",
        type: "select",
        options: [
          { value: "1 Minute", label: "1 Minute" },
          { value: "2 Minute", label: "2 Minute" },
          { value: "3 Minute", label: "3 Minute" },
          { value: "4 Minute", label: "4 Minute" },
        ],
      },
      {
        name: "1",
        type: "select",
        options: [
          { value: "1 ", label: "1 " },
          { value: "2 ", label: "2 " },
          { value: "3 ", label: "3 " },
          { value: "4 ", label: "4 " },
        ],
      },
      {
        name: ">",
        type: "select",
        options: [
          { value: "> ", label: "> " },
          { value: "< ", label: "< " },
        ],
      },
    ],
  },
};
