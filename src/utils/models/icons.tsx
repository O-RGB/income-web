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
    const sizes = 'w-7 h-7'
    this.icons.set("1", new IconsModel("COLOR","1", <img className={sizes} src="/icons/car-icon.png"/>));
    this.icons.set("2", new IconsModel("COLOR","2", <img className={sizes} src="/icons/soap-icon.png"/>));
    this.icons.set("3", new IconsModel("COLOR","3", <img className={sizes} src="/icons/washing-icon.png"/>));
    this.icons.set("4", new IconsModel("COLOR","4", <img className={sizes} src="/icons/home-icon.png"/>));
    this.icons.set("5", new IconsModel("COLOR","5", <img className={sizes} src="/icons/graph-icon.png"/>));
    this.icons.set("6", new IconsModel("COLOR","6", <img className={sizes} src="/icons/meat-icon.png"/>));
    this.icons.set("7", new IconsModel("COLOR","7", <img className={sizes} src="/icons/food-icon.png"/>));
    this.icons.set("8", new IconsModel("COLOR","8", <img className={sizes} src="/icons/tea-icon.png"/>));
    this.icons.set("9", new IconsModel("COLOR","9", <img className={sizes} src="/icons/foot-icon.png"/>));
    this.icons.set("10", new IconsModel("COLOR","10", <img className={sizes} src="/icons/dumbbell-icon.png"/>));
    this.icons.set("11", new IconsModel("COLOR","11", <img className={sizes} src="/icons/bread-icon.png"/>));
    this.icons.set("12", new IconsModel("COLOR","12", <img className={sizes} src="/icons/apple-icon.png"/>));
    this.icons.set("13", new IconsModel("COLOR","13", <img className={sizes} src="/icons/milk-icon.png"/>));
    this.icons.set("14", new IconsModel("COLOR","14", <img className={sizes} src="/icons/rabbitcup-icon.png"/>));
    this.icons.set("15", new IconsModel("COLOR","15", <img className={sizes} src="/icons/dog-icon.png"/>));
    this.icons.set("16", new IconsModel("COLOR","16", <img className={sizes} src="/icons/watermelon-icon.png"/>));
    this.icons.set("17", new IconsModel("COLOR","17", <img className={sizes} src="/icons/chicken-icon.png"/>));
    this.icons.set("18", new IconsModel("COLOR","18", <img className={sizes} src="/icons/cake-icon.png"/>));
    this.icons.set("19", new IconsModel("COLOR","19", <img className={sizes} src="/icons/strawberry-icon.png"/>));
    this.icons.set("20", new IconsModel("COLOR","20", <img className={sizes} src="/icons/camera-icon.png"/>));
    this.icons.set("21", new IconsModel("COLOR","21", <img className={sizes} src="/icons/book-icon.png"/>));
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
  typeRender: "COLOR" | "COMMON";
  name: string;
  render: React.ReactNode;
  constructor(typeRender: "COLOR" | "COMMON", name: string, render: React.ReactNode) {
    this.typeRender = typeRender;
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
