import { BiSolidCoffee } from "react-icons/bi";
import { FaShoppingBag, FaAppleAlt, FaParking, FaBusAlt, FaTheaterMasks, FaHamburger, FaLaptopHouse, FaMobileAlt, FaMoneyCheckAlt, FaUniversity } from "react-icons/fa";
import { FaBed, FaBicycle, FaCalendarCheck, FaCar, FaCartArrowDown, FaCreditCard, FaDollarSign, FaFileInvoiceDollar, FaGraduationCap, FaHouseUser, FaIceCream, FaLightbulb, FaMoneyBillWave, FaPiggyBank, FaPlane, FaPumpSoap, FaStore, FaTaxi, FaTrain, FaTruck, FaUtensils } from "react-icons/fa6";
import { GiBank, GiBanknote, GiCardExchange, GiElectric, GiForkKnifeSpoon, GiGasPump, GiHouseKeys, GiMedicinePills, GiMilkCarton, GiMoneyStack, GiReceiveMoney, GiShop, GiShoppingCart, GiTakeMyMoney, GiThermometerCold, GiWallet, GiWashingMachine } from "react-icons/gi";
import { IoIosCard, IoIosRestaurant, IoIosWater, IoIosMedical, IoIosCash, IoIosPartlySunny, IoIosGlobe, IoIosBasket, IoIosCar, IoIosHeart, IoIosHome, IoIosWallet, IoMdAirplane, IoMdBasket } from "react-icons/io";
import { IoBus, IoFastFoodSharp } from "react-icons/io5";
import { MdAttachMoney, MdComputer, MdDirectionsCar, MdDirectionsWalk, MdFitnessCenter, MdFlight, MdHome, MdLocalCafe, MdLocalHospital, MdLocalPizza, MdOutlineDirectionsCar, MdOutlineFastfood, MdOutlineHotel, MdOutlineLocalBar, MdOutlineLocalGroceryStore, MdOutlineMoneyOff, MdOutlineShoppingBag, MdOutlineStoreMallDirectory, MdPets, MdRestaurant, MdSchool, MdShoppingCart, MdSoupKitchen, MdSubway, MdWineBar } from "react-icons/md";
import { TbGraphFilled } from "react-icons/tb";

export class IconsModelList {
  icons = new Map<string, IconsModel>();
  constructor() {
    this.icons.set("1", new IconsModel("IoBus", <IoBus />));
    this.icons.set("2", new IconsModel("FaPumpSoap", <FaPumpSoap />));
    this.icons.set("3", new IconsModel("GiWashingMachine", <GiWashingMachine />));
    this.icons.set("4", new IconsModel("FaCalendarCheck", <FaCalendarCheck />));
    this.icons.set("5", new IconsModel("TbGraphFilled", <TbGraphFilled />));
    this.icons.set("6", new IconsModel("MdSoupKitchen", <MdSoupKitchen />));
    this.icons.set("7", new IconsModel("IoFastFoodSharp", <IoFastFoodSharp />));
    this.icons.set("8", new IconsModel("BiSolidCoffee", <BiSolidCoffee />));
    this.icons.set("9", new IconsModel("MdShoppingCart", <MdShoppingCart />));
    this.icons.set("10", new IconsModel("FaPiggyBank", <FaPiggyBank />));
    this.icons.set("11", new IconsModel("IoIosCard", <IoIosCard />));
    this.icons.set("12", new IconsModel("FaMoneyBillWave", <FaMoneyBillWave />));
    this.icons.set("13", new IconsModel("GiElectric", <GiElectric />));
    this.icons.set("14", new IconsModel("MdSchool", <MdSchool />));
    this.icons.set("15", new IconsModel("FaCar", <FaCar />));
    this.icons.set("16", new IconsModel("IoIosRestaurant", <IoIosRestaurant />));
    this.icons.set("17", new IconsModel("GiGasPump", <GiGasPump />));
    this.icons.set("18", new IconsModel("MdHome", <MdHome />));
    this.icons.set("19", new IconsModel("FaShoppingBag", <FaShoppingBag />));
    this.icons.set("20", new IconsModel("MdLocalHospital", <MdLocalHospital />));
    this.icons.set("21", new IconsModel("FaTrain", <FaTrain />));
    this.icons.set("22", new IconsModel("GiMedicinePills", <GiMedicinePills />));
    this.icons.set("23", new IconsModel("MdFlight", <MdFlight />));
    this.icons.set("24", new IconsModel("FaUtensils", <FaUtensils />));
    this.icons.set("25", new IconsModel("FaTheaterMasks", <FaTheaterMasks />));
    this.icons.set("26", new IconsModel("FaLightbulb", <FaLightbulb />));
    this.icons.set("27", new IconsModel("IoIosWater", <IoIosWater />));
    this.icons.set("28", new IconsModel("FaGraduationCap", <FaGraduationCap />));
    this.icons.set("29", new IconsModel("MdPets", <MdPets />));
    this.icons.set("30", new IconsModel("IoIosMedical", <IoIosMedical />));
    this.icons.set("31", new IconsModel("MdDirectionsCar", <MdDirectionsCar />));
    this.icons.set("32", new IconsModel("FaBicycle", <FaBicycle />));
    this.icons.set("33", new IconsModel("GiThermometerCold", <GiThermometerCold />));
    this.icons.set("34", new IconsModel("IoIosCash", <IoIosCash />));
    this.icons.set("35", new IconsModel("MdLocalCafe", <MdLocalCafe />));
    this.icons.set("36", new IconsModel("FaAppleAlt", <FaAppleAlt />));
    this.icons.set("37", new IconsModel("GiHouseKeys", <GiHouseKeys />));
    this.icons.set("38", new IconsModel("MdFitnessCenter", <MdFitnessCenter />));
    this.icons.set("39", new IconsModel("FaParking", <FaParking />));
    this.icons.set("40", new IconsModel("MdDirectionsWalk", <MdDirectionsWalk />));
    this.icons.set("41", new IconsModel("FaTaxi", <FaTaxi />));
    this.icons.set("42", new IconsModel("MdComputer", <MdComputer />));
    this.icons.set("43", new IconsModel("FaBusAlt", <FaBusAlt />));
    this.icons.set("44", new IconsModel("IoIosPartlySunny", <IoIosPartlySunny />));
    this.icons.set("45", new IconsModel("FaTruck", <FaTruck />));
    this.icons.set("46", new IconsModel("MdSubway", <MdSubway />));
    this.icons.set("47", new IconsModel("MdOutlineFastfood", <MdOutlineFastfood />));
    this.icons.set("48", new IconsModel("FaHamburger", <FaHamburger />));
    this.icons.set("49", new IconsModel("GiMilkCarton", <GiMilkCarton />));
    this.icons.set("50", new IconsModel("MdOutlineLocalBar", <MdOutlineLocalBar />));
    this.icons.set("51", new IconsModel("FaIceCream", <FaIceCream />));
    this.icons.set("52", new IconsModel("GiShop", <GiShop />));
    this.icons.set("53", new IconsModel("IoIosCar", <IoIosCar />));
    this.icons.set("54", new IconsModel("FaPlane", <FaPlane />));
    this.icons.set("55", new IconsModel("MdOutlineLocalGroceryStore", <MdOutlineLocalGroceryStore />));
    this.icons.set("56", new IconsModel("FaMobileAlt", <FaMobileAlt />));
    this.icons.set("57", new IconsModel("GiTakeMyMoney", <GiTakeMyMoney />));
    this.icons.set("58", new IconsModel("IoIosHome", <IoIosHome />));
    this.icons.set("59", new IconsModel("FaLaptopHouse", <FaLaptopHouse />));
    this.icons.set("60", new IconsModel("GiReceiveMoney", <GiReceiveMoney />));
    this.icons.set("61", new IconsModel("IoIosHeart", <IoIosHeart />));
    this.icons.set("62", new IconsModel("MdOutlineDirectionsCar", <MdOutlineDirectionsCar />));
    this.icons.set("63", new IconsModel("FaTrain", <FaTrain />));
    this.icons.set("64", new IconsModel("GiForkKnifeSpoon", <GiForkKnifeSpoon />));
    this.icons.set("65", new IconsModel("MdRestaurant", <MdRestaurant />));
    this.icons.set("66", new IconsModel("FaHouseUser", <FaHouseUser />));
    this.icons.set("67", new IconsModel("IoMdAirplane", <IoMdAirplane />));
    this.icons.set("68", new IconsModel("MdLocalPizza", <MdLocalPizza />));
    this.icons.set("69", new IconsModel("FaDollarSign", <FaDollarSign />));
    this.icons.set("70", new IconsModel("GiMoneyStack", <GiMoneyStack />));
    this.icons.set("71", new IconsModel("IoIosCash", <IoIosCash />));
    this.icons.set("72", new IconsModel("FaFileInvoiceDollar", <FaFileInvoiceDollar />));
    this.icons.set("73", new IconsModel("MdOutlineShoppingBag", <MdOutlineShoppingBag />));
    this.icons.set("74", new IconsModel("FaCartArrowDown", <FaCartArrowDown />));
    this.icons.set("75", new IconsModel("GiCardExchange", <GiCardExchange />));
    this.icons.set("76", new IconsModel("IoMdBasket", <IoMdBasket />));
    this.icons.set("77", new IconsModel("MdOutlineHotel", <MdOutlineHotel />));
    this.icons.set("78", new IconsModel("FaBed", <FaBed />));
    this.icons.set("79", new IconsModel("GiShoppingCart", <GiShoppingCart />));
    this.icons.set("80", new IconsModel("IoIosBasket", <IoIosBasket />));
    this.icons.set("81", new IconsModel("FaStore", <FaStore />));
    this.icons.set("82", new IconsModel("GiShop", <GiShop />));
    this.icons.set("83", new IconsModel("MdOutlineStoreMallDirectory", <MdOutlineStoreMallDirectory />));
    this.icons.set("84", new IconsModel("GiBanknote", <GiBanknote />));
    this.icons.set("85", new IconsModel("GiWallet", <GiWallet />));
    this.icons.set("86", new IconsModel("IoIosWallet", <IoIosWallet />));
    this.icons.set("87", new IconsModel("FaCreditCard", <FaCreditCard />));
    this.icons.set("88", new IconsModel("GiBank", <GiBank />));
    this.icons.set("89", new IconsModel("IoIosCard", <IoIosCard />));
    this.icons.set("90", new IconsModel("FaUniversity", <FaUniversity />));
    this.icons.set("91", new IconsModel("MdOutlineMoneyOff", <MdOutlineMoneyOff />));
    this.icons.set("92", new IconsModel("FaMoneyCheckAlt", <FaMoneyCheckAlt />));
    this.icons.set("93", new IconsModel("IoIosCash", <IoIosCash />));
    this.icons.set("94", new IconsModel("FaPiggyBank", <FaPiggyBank />));
    this.icons.set("95", new IconsModel("MdAttachMoney", <MdAttachMoney />));
    this.icons.set("96", new IconsModel("GiReceiveMoney", <GiReceiveMoney />));
    this.icons.set("97", new IconsModel("IoIosWallet", <IoIosWallet />));
  }

  getIconById(iconId: string | number) {
    return this.icons.get(String(iconId));
  }

  getAllIcons(){
    let list:IconsModel[] = []
    this.icons.forEach((data) => {
      if(data.render){
        list.push(data)
      }
    })
    return list
  }
    
}

export class IconsModel implements IIcons {
  name: string;
  render: React.ReactNode;
  constructor(name: string, render: React.ReactNode) {
    this.name = name;
    this.render = render;
  }

  getIcon() {
    return this.render;
  }

  getName() {
    return this.name;
  }
}
