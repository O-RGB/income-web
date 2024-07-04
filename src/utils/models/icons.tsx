import Image from "next/image";

 
export class IconsModelList {
  icons = new Map<string, IconsModel>();
  constructor() {
    const size = 28
    this.icons.set("1", new IconsModel("COLOR","1", <Image width={size} height={size} alt="" src="/icons/car-icon.png"/>));
    this.icons.set("2", new IconsModel("COLOR","2", <Image width={size} height={size} alt="" src="/icons/soap-icon.png"/>));
    this.icons.set("3", new IconsModel("COLOR","3", <Image width={size} height={size} alt="" src="/icons/washing-icon.png"/>));
    this.icons.set("4", new IconsModel("COLOR","4", <Image width={size} height={size} alt="" src="/icons/home-icon.png"/>));
    this.icons.set("5", new IconsModel("COLOR","5", <Image width={size} height={size} alt="" src="/icons/graph-icon.png"/>));
    this.icons.set("6", new IconsModel("COLOR","6", <Image width={size} height={size} alt="" src="/icons/meat-icon.png"/>));
    this.icons.set("7", new IconsModel("COLOR","7", <Image width={size} height={size} alt="" src="/icons/food-icon.png"/>));
    this.icons.set("8", new IconsModel("COLOR","8", <Image width={size} height={size} alt="" src="/icons/tea-icon.png"/>));
    this.icons.set("9", new IconsModel("COLOR","9", <Image width={size} height={size} alt="" src="/icons/foot-icon.png"/>));
    this.icons.set("10", new IconsModel("COLOR","10", <Image width={size} height={size} alt="" src="/icons/dumbbell-icon.png"/>));
    this.icons.set("11", new IconsModel("COLOR","11", <Image width={size} height={size} alt="" src="/icons/bread-icon.png"/>));
    this.icons.set("12", new IconsModel("COLOR","12", <Image width={size} height={size} alt="" src="/icons/apple-icon.png"/>));
    this.icons.set("13", new IconsModel("COLOR","13", <Image width={size} height={size} alt="" src="/icons/milk-icon.png"/>));
    this.icons.set("14", new IconsModel("COLOR","14", <Image width={size} height={size} alt="" src="/icons/rabbitcup-icon.png"/>));
    this.icons.set("15", new IconsModel("COLOR","15", <Image width={size} height={size} alt="" src="/icons/dog-icon.png"/>));
    this.icons.set("16", new IconsModel("COLOR","16", <Image width={size} height={size} alt="" src="/icons/watermelon-icon.png"/>));
    this.icons.set("17", new IconsModel("COLOR","17", <Image width={size} height={size} alt="" src="/icons/chicken-icon.png"/>));
    this.icons.set("18", new IconsModel("COLOR","18", <Image width={size} height={size} alt="" src="/icons/cake-icon.png"/>));
    this.icons.set("19", new IconsModel("COLOR","19", <Image width={size} height={size} alt="" src="/icons/strawberry-icon.png"/>));
    this.icons.set("20", new IconsModel("COLOR","20", <Image width={size} height={size} alt="" src="/icons/camera-icon.png"/>));
    this.icons.set("21", new IconsModel("COLOR","21", <Image width={size} height={size} alt="" src="/icons/book-icon.png"/>));
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
