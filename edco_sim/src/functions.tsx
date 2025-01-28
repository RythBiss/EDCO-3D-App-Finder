export const allMachineData: any = {
    //job size is per hour, remember that when making the lists
    ALR: {
      apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue/adhesive'],
      depth: -1,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['pneumatic'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
              ],
      info: ['200 SQFT. Per hour, Pneumatic'],
      number: ['C10301'], //add diferent sizes as different machines.
      displayName: ['ALR']
    },
    ALRBS: {
      apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue/adhesive'],
      depth: -1,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['pneumatic'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/big-stick-chisel-scalers/ALR-BS-Straight-Machine-Slider.jpg'
              ],
      info: ['300 SQFT. Per hour, Pneumatic'],
      number: ['27100'], //add ERGO model as seperate machine
      displayName: ['ALR-BS']
    },
    TS8: {
      apps: ['vinyl', 'linoleum', 'carpet', 'VCT'],
      depth: -1,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['electric residential'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
              ],
      info: ['200 SQFT/Hour, Electric 3/4HP'],
      number: ['94400'],
      displayName: ['TS-8']
    },
    SEC: {
      apps: ['glue/adhesive', 'paint', 'flakey paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'high spots', 'sealer','thinset', 'industrial'],
      depth: 0,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['electric residential'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg'
              ],
      info: ['250 SQFT/Hour,1/32" depth/pass, Electric 1.5HP, Dust control required'],
      number: ['59800'],
      displayName: ['SEC-NG']
    },
    _2GC: {
      apps: ['glue/adhesive', 'paint', 'flakey paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'high spots', 'sealer','thinset', 'industrial'],
      depth: 0,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['gas', 'electric commercial', 'electric industrial'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2GC-NG-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2EC-NG-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2EC-NG-Machine-Slider.jpg'
              ],
      info: ['500 SQFT/Hour, 1/32" depth/pass, Gas, Dust control required','500 SQFT/Hour, 1/32" depth/pass, Electric 1.5 HP, Dust control required','500 SQFT/Hour, 1/32" depth/pass, Electric 3HP, Dust control required'], // ========================================== VARIES
      number: ['59300', '59200', '59600'],
      displayName: ['2GC-NG','2EC-NG','2EC-NG']
    },
    _2DHD: {
      apps: ['glue/adhesive', 'paint', 'flakey paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'high spots', 'sealer','thinset', 'industrial'],
      depth: 0,
      //recJobSize: 2,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['electric industrial', 'propane'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Electric-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Propane-Machine-Slider.jpg'
              ],
      info: ['1000 SQFT/Hour, 1/32" depth/pass, Electric 5HP, Dust control required','1000 SQFT/Hour, 1/32" depth/pass, Propane, Dust control required'], // ========================================== VARIES
      number: ['58100', '58200'],
      displayName: ['2D-HDE','2D-HDP']
    },
    TL9: {
      apps: ['leveling', 'rubber', 'concrete', 'high spots', 'sealer', 'industrial'],
      depth: 0,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['electric residential'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-turbo-lite-grinder/TL-9-Machine-Slider.jpg'
              ],
      info: ['400 SQFT/Hour, 1/32" depth/pass, Electric 1.5HP, Dust control required'],
      number: ['58900'],
      displayName: ['TL-9']
    },
    // TMC7: {
    //   apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'edges', 'residual glue/adhesive', 'high spots', 'sealer'],
    //   depth: 0,
    //   //recJobSize: 0,
    //   onCrete: true,
    //   //if the machine can achive a CSP 2-3 for new coatings
    //   surfacePrep: true,
    //   edges: true,
    //   power: ['electric commercial'],
    //   image: [
    //           'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-7-turbo-edge-grinder/TMC-7-Electric-Machine-Slider.jpg'
    //           ],
    //   info: ['800 Lineal ft. Per Hour, 2HP 115V/20A, 1/32" depth/pass, Dust control required'],
    //   number: ['57200'],
    //   displayName: ['TMC-7E']
    // },
    TG10: {
      apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'high spots', 'sealer', 'industrial'],
      depth: 1,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['gas', 'electric industrial', 'propane'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Electric-Machine.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Electric-Machine.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Propane-Machine-Slider.jpg'
              ],
      info: ['500 SQFT/Hour, 1/16" depth/pass, Gas, Dust control required','500 SQFT/Hour, 1/16" depth/pass, Electric 5HP, Dust control required','500 SQFT/Hour, 1/16" depth/pass, Propane, Dust control required'], // ========================================== VARIES
      number: ['56600', '56900', '56700'],
      displayName: ['TG-10G','TG-10E', 'TG-10P']
    },
    CPL8: {
      apps: ['concrete'],
      depth: 0,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['gas', 'electric commercial'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Electric-Machine-Slider.jpg'
              ],
      info: ['250 SQFT/Hour, 1/32" depth/pass, Gas, Dust control required','250 SQFT/Hour, 1/32" depth/pass, Electric 1.5HP, Dust control required'], // ========================================== VARIES
      number: ['69500', '69300'],
      displayName: ['CPL-8G','CPL-8E']
    },
    CPM8: { //fixed the CPM8-G showing up for commercial electric options by adding a "new machine" with commercial electric power, but the same info as the industrial electric machine.
      apps: ['leveling', 'concrete', 'trip hazard', 'rubber', 'high spots'],
      depth: 2,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['gas', 'electric commercial', 'electric industrial', 'propane'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Electric-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Electric-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8%20Propane%20Machine%20Slider.jpg'
              ], 
      info: ['500 SQFT/Hour, Gas, 1/8" depth/pass, Dust control required','500 SQFT/Hour, 1/8" depth/pass, Electric 5HP, Dust control required','500 SQFT/Hour, 1/8" depth/pass, Electric 5HP, Dust control required','500 SQFT/Hour, 1/8" depth/pass, Propane, Dust control required'], // ========================================== VARIES
      number: ['79300', '79500', '79500', '72600'],
      displayName: ['CPM-8G','CPM-8E', 'CPM-8E','CPM-8P']
    },
    CPM10: {
      apps: ['leveling', 'concrete', 'rubber', 'high spots'],
      depth: 2,
      //recJobSize: 1,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['gas', 'electric industrial'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/10-walk-behind-crete-planer-r/CPM-10-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/10-walk-behind-crete-planer-r/CPM-10-Electric-Machine-Slider.jpg'
              ],
      info: ['700 SQFT/Hour, 1/8" depth/pass, Gas, Dust control required','700 SQFT/Hour, 1/8" depth/pass, Electric 7.5HP, Dust control required'], // ========================================== VARIES
      number: ['69100', '69200'],
      displayName: ['CPM-10G','CPM-10E']
    },
    CD5: {
      apps: ['leveling', 'concrete', 'trip hazard', 'high spots'],
      depth: 3,
      //recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['pneumatic'],
      image: ['https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg'],
      info: ['250 SQFT/Hour, 1/4" depth/pass, Pneumatic, Dust control required, Only for use on slabs that are 6" thick or greater.'],
      number: ['63100'],
      displayName: ['CD-5']
    }
}

export const toolsByApplicationAndMachine: any = {
  Scaler4: {
    apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    name: '4" Steel Chisel',
    machines: ['ALR'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/C10302_4_SteelChisel-450x450.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['C10302'],
    hasDiamonds: false
  },
  Scaler2: {
    apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    name: '2" Steel Chisel',
    machines: ['ALR'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/C10303_2_SteelChisel.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['C10303'],
    hasDiamonds: false
  },
  Scaler114: {
    apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    name: '1-1/4" Steel Chisel',
    machines: ['ALR'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/C10324_SteelChisel.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['C10324'],
    hasDiamonds: false
  },
  ChippingPoint: {
    apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    name: 'Chipping Point',
    machines: ['ALR'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/C10327_MPT_ChippingPoint.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['C10327'],
    hasDiamonds: false
  },
  Scaler2BS: {
    apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    name: '2" Steel Chisel',
    machines: ['ALRBS'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/27031_BigStick_2_SingleBevel.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['27031'],
    hasDiamonds: false //finish adding all core tooling
  },
  Scraper: {
    apps: ['vinyl', 'linoleum', 'carpet', 'rubber', 'paint', 'corrosion', 'oil'],
    name: 'Scraper Blades',
    machines: ['ALR'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['C10305'],
    hasDiamonds: false
  }, 
  Scaler3BS: {
    apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    name: '3" Steel Chisel',
    machines: ['ALRBS'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/27033_BigStick_3_SingleBevel.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['27033'],
    hasDiamonds: false //finish adding all core tooling
  },
  ScraperBS: {
    apps: ['carpet', 'rubber', 'paint', 'corrosion', 'oil'],
    name: 'Scraper Blades',
    machines: ['ALRBS'],
    image: 'https://edcostore.com/wp-content/uploads/2018/04/27035_ScraperBlade-1.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['27035'],
    hasDiamonds: false
  }, 
  ChippingPointBS: {
    apps: ['carpet', 'rubber', 'paint', 'corrosion', 'oil'],
    name: 'Chipping Point',
    machines: ['ALRBS'],
    image: 'https://edcostore.com/wp-content/uploads/2018/09/27037.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['27037'],
    hasDiamonds: false
  }, 
  FloorStripperRigid: {
    apps: ['vinyl', 'linoleum', 'carpet', 'VCT'],
    name: '8" Rigid Scraper Blade',
    machines: ['TS8'],
    image: 'https://edcostore.com/wp-content/uploads/2017/12/28030_TileSharkBlade-450x450.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['28040'],
    hasDiamonds: false
  },
  FloorStripperCarpet: {
    apps: ['linoleum', 'carpet'],
    name: '8" Scraper Blade',
    machines: ['TS8'],
    image: 'https://edcostore.com/wp-content/uploads/2017/12/28030_TileSharkBlade-450x450.jpg',
    CSP: 1,
    info: 'STRIP',
    number: ['28050'],
    hasDiamonds: false
  },
  MagnaBlades: {
    apps: ['glue/adhesive', 'mastic', 'thinset', 'industrial', 'flakey paint'],
    name: 'Magna-Blades',
    machines: ['SEC', 'TG10', 'TMC7'],
    image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg',
    CSP: 1,
    info: 'STRIP', //    info: 'STRIP,Material That Can Be Cut With a Utility Knife',
    number: ['12501LC'],
    hasDiamonds: false
  },
  MagnaBladesDual: {
    apps: ['glue/adhesive', 'mastic', 'thinset', 'industrial', 'flakey paint'],
    name: 'Magna-Blades (L & R)',
    machines: ['_2DHD', '_2GC', 'TMC7'],
    image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg',
    CSP: 1,
    info: 'STRIP', //    info: 'STRIP,Material That Can Be Cut With a Utility Knife',
    number: ['12501LC & 12501RC'],
    hasDiamonds: false,
    singleTool: "MagnaBlades"
  },
  DymaSegs: {
    apps: ['paint', 'leveling', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'glue/adhesive', 'high spots', 'sealer', 'thinset'],
    name: 'Dyma-Segs 18 Grit',
    machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
    image: 'https://edcostore.com/wp-content/uploads/2017/04/DYMA-Segs-MC.jpg',
    CSP: 2,
    info: 'GRIND - Coarse finish',
    number: ["Inquire for details."],
    hasDiamonds: true
  },
  PCDbacking: {
    apps: ['industrial', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'high spots', 'sealer'],
    name: 'PCD w/Backing Segment',
    machines: ['SEC', 'TG10', 'TL9', 'TMC7'],
    image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg',
    CSP: 3,
    info: 'REMOVE - Textured finish', //    info: 'REMOVE,Textured finish,Material That Cannot Be Cut With a Utility Knife',
    number: ["Inquire for details."],
    hasDiamonds: true
  },
  PCDbackingDual: {
    apps: ['industrial', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'high spots', 'sealer'],
    name: 'PCD w/Backing Segment (L & R)',
    machines: ['_2DHD', '_2GC', 'TMC7'],
    image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg',
    CSP: 3,
    info: 'REMOVE - Textured finish', //    info: 'REMOVE,Textured finish,Material That Cannot Be Cut With a Utility Knife',
    number: ["Inquire for details."],
    hasDiamonds: true,
    singleTool: "PCDbacking"
  },
  DymaDots: {
    apps: ['paint', 'leveling', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'glue/adhesive', 'high spots', 'sealer', 'thinset'],
    name: 'Dyma-Dots 30 Grit',
    machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
    image: 'https://edcostore.com/wp-content/uploads/2017/04/QC2B-MC-0030_DoubleDotGray-450x450.jpg',
    CSP: 1,
    info: 'GRIND - Smooth finish', //"Finer grits available" don't know where to put this.
    number: ["Inquire for details."],
    hasDiamonds: true
  },
  CarbideCutter: {
    apps: ['leveling', 'concrete', 'trip hazard', 'high spots'],
    name: 'CPM8 Carbide Cutter Drum',
    machines: ['CPM8'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/65050C-e1578341407835.jpg',
    CSP: 6,
    info: 'REMOVE',
    number: ['65050C'],
    hasDiamonds: false
  },
  CarbideCutter10: {
    apps: ['leveling', 'concrete', 'trip hazard', 'high spots'],
    name: 'CPM10 Carbide Cutter Drum',
    machines: ['CPM10'],
    image: 'https://edcostore.com/wp-content/uploads/2022/01/65270C-scaled-e1725560138505.jpeg',
    CSP: 6,
    info: 'REMOVE',
    number: ['65270C'],
    hasDiamonds: false
  },
  CarbideCutterL: {
    apps: ['leveling', 'concrete', 'trip hazard', 'high spots'],
    name: 'CPL8 Carbide Cutter Drum',
    machines: ['CPL8'],
    image: 'https://edcostore.com/wp-content/uploads/2022/01/66309C-scaled-e1728650023716.jpg',
    CSP: 6,
    info: 'REMOVE',
    number: ['66309C'],
    hasDiamonds: false
  },
  // SteelCutters: {
  //   apps: ['rubber', 'concrete'],
  //   name: 'Carbide Cutter',
  //   machines: ['CPM8', 'CPL8', 'CPM10'],
  //   image: 'https://edcostore.com/wp-content/uploads/2017/06/20236_18_PointedSteelCutter.jpg',
  //   CSP: 6,
  //   info: 'REMOVE,Carbide Drum',
  //   number: ['12206'],
  //   hasDiamonds: false
  // },
  FivePoint: {
    apps: ['concrete', 'trip hazard', 'high spots'],
    name: '5-Point Bit',
    machines: ['CD5'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/18810_5PointCarbideBit-450x450.jpg',
    CSP: 9,
    info: 'REMOVE',
    number: ['18810'],
    hasDiamonds: false
  },
  NinePoint: {
    apps: ['concrete', 'trip hazard', 'high spots'],
    name: '9-Point Bit',
    machines: ['CD5'],
    image: 'https://edcostore.com/wp-content/uploads/2017/06/18820_9PointCarbideBit-450x450.jpg',
    CSP: 9,
    info: 'REMOVE',
    number: ['18820'],
    hasDiamonds: false
  },
}

export const applicationDataObjects: any = {
  concrete: {
      name: 'Concrete',
      layers: 1,
      sublayers: ['concrete'],
      modelName: 'concrete'
  },
  triphazard: {
      name: 'Trip Hazard',
      layers: 1,
      sublayers: ['trip hazard'],
      modelName: 'trip hazard'
  },
  highspots: {
      name: 'High Spots',
      layers: 1,
      sublayers: ['high spots'],
      modelName: 'high spots'
  },
  vinyl: {
      name: 'Vinyl',
      layers: 4,
      sublayers: ['vinyl', 'glue/adhesive', 'residual glue/adhesive'],
      modelName: 'vinyl'
  },
  linoleum: {
      name: 'Linoleum',
      layers: 4,
      sublayers: ['linoleum', 'glue/adhesive', 'residual glue/adhesive'],
      modelName: 'linoleum'
  },
  ceramic: {
      name: 'Ceramic',
      layers: 4,
      sublayers: ['ceramic', 'thinset', 'residual glue/adhesive'],
      modelName: 'ceramic'
  },
  thinset: {
      name: 'Thinset',
      layers: 3,
      sublayers: ['thinset', 'residual glue/adhesive'],
      modelName: 'glue'
  },
  carpet: {
      name: 'Carpet',
      layers: 4,
      sublayers: ['carpet', 'glue/adhesive', 'residual glue/adhesive'],
      modelName: 'carpet'
  },
  mastic: {
      name: 'Mastic',
      layers: 3,
      sublayers: ['mastic', 'residual glue/adhesive'],
      modelName: 'mastic'
  },
  paint: {
      name: 'Paint',
      layers: 2,
      sublayers: ['paint'],
      modelName: 'paint'
  },
  paintf: {
      name: 'Flakey Paint',
      layers: 2,
      sublayers: ['flakey paint'],
      modelName: 'paint'
  },
  sealer: {
      name: 'Sealer',
      layers: 2,
      sublayers: ['sealer'],
      modelName: 'sealer'
  },
  epoxy: {
      name: 'Epoxy Coating',
      layers: 2,
      sublayers: ['epoxy'],
      modelName: 'epoxy'
  },
  glue: {
      name: 'Glue/Adhesive',
      layers: 3,
      sublayers: ['glue/adhesive', 'residual glue/adhesive'],
      modelName: 'glue'
  },
  residual: {
      name: 'Residual Glue/Adhesive',
      layers: 2,
      sublayers: ['residual glue/adhesive'],
      modelName: 'residual'
  },
  industrial: {
      name: 'Industrial Buildup',
      layers: 2,
      sublayers: ['industrial'],
      modelName: 'residual'
  }
}

export const applicationDataObjectsWood: any = {
    //====================== on wood apps ======================
  vinyl: {
      name: 'Vinyl',
      layers: 1,
      sublayers: ['vinyl'],
      modelName: 'vinyl'
  },
  linoleum: {
      name: 'Linoleum',
      layers: 1,
      sublayers: ['linoleum'],
      modelName: 'linoleum'
  },
  ceramic: {
      name: 'Ceramic',
      layers: 1,
      sublayers: ['ceramic'],
      modelName: 'ceramic'
  },
  carpet: {
      name: 'Carpet',
      layers: 1,
      sublayers: ['carpet'],
      modelName: 'carpet'
  }
}



const getCorrectApplicationList = (layerObject: any) => {
  if(layerObject !== undefined){
    const surfaceType = layerObject.getSurfaceType();
    if(surfaceType == "concrete"){
      return applicationDataObjects;
    } else {
      return applicationDataObjectsWood;
    }
  }
}

export const getApplicationDatabaseName = (str: string): string => {

  console.log("app name" + str)
  if(str == 'glue/adhesive') return 'glue';
  else if(str == 'residual glue/adhesive') return 'residual';
  else if(str == 'flakey paint') return 'paintf';
  else return str.replace(/\s+/g, '');
}

// returns index based on power type
export const getPowerTypeImageIndexGlobal = (machine: string, layer: any) => {

  try{
    let index = allMachineData[machine].power.indexOf(layer.powerType)

    if(index == -1) index = 0

    return index
  }catch(e){
    return 0
  }
}

// returns index of part number
export const getMachinePartNumberGlobal = (machine: string, layer: any) => {

   return allMachineData[machine].number[getPowerTypeImageIndexGlobal(machine, layer)];

}

export const getToolingPartNumberGlobal = (tooling: string) => {
    let num ='n/a';

    Object.keys(toolsByApplicationAndMachine).forEach((element: any) => {
        if(toolsByApplicationAndMachine[element].name == tooling){

            num = toolsByApplicationAndMachine[element].number[0];
            
        }
    });

    return num;
}

export const getToolingKeyByName = (toolingName: string) => {
  let key ='n/a';

  Object.keys(toolsByApplicationAndMachine).forEach((element: any) => {
      if(toolsByApplicationAndMachine[element].name == toolingName){

          key = element;
          
      }
  });

  return key;
}

export const isMachineElectricGlobal = (number: string) => {
    let isElectric =false;;

    Object.keys(allMachineData).forEach((element: any) => {
      let length = allMachineData[element].number.length;

      for(var i = 0; i < length; i++){
        if(allMachineData[element].number[i] == number){
          if(allMachineData[element].power[i] == 'electric residential' || allMachineData[element].power[i] == 'electric commercial' || allMachineData[element].power[i] == 'electric industrial'){
            isElectric = true;
          }
        }
      }
    });

    return isElectric;
}

export const toolingHasDiamonds = (tooling: string) => {

  let toolingObjectID: string;

  Object.keys(toolsByApplicationAndMachine).forEach((element: any) => {
    if(toolsByApplicationAndMachine[element].name == tooling){
      toolingObjectID = element;
    }
  });

  return toolsByApplicationAndMachine[toolingObjectID].hasDiamonds;

}

export const getModelNameBySurfacename = (surfaceName: string, layerObject: any) => {
  
  let modelName = undefined;

  if(layerObject !== undefined){
    let applicationList = getCorrectApplicationList(layerObject);
  
    for (const [key, value] of Object.entries(applicationList)) {
  
      if(surfaceName == value.name.toLowerCase()){
  
        modelName = value.modelName;
  
        break;
  
      }
    }
  }

  if(modelName == undefined){
    return surfaceName;
  }

  return modelName;
}

export const populateMaterialRemovedAnswers = (layerObject: any) => {
  let arr: string[] = []

  if(layerObject !== undefined){
    let applicationList = getCorrectApplicationList(layerObject);

    Object.keys(applicationList).map((key) =>{
        arr.push(applicationList[key])
    })
  }

  return arr;
}

export const isNameMachine = (name:string) => {
  try{
    if(allMachineData[name] == undefined){
      return false;
    }
  else{
    return true;
  }
  }catch(e){
    return false;
  }
}

export const getCSPByToolName = (name: string): number | null => {
  // Iterate through all tools in the object
  for (const toolKey in toolsByApplicationAndMachine) {
    const tool = toolsByApplicationAndMachine[toolKey];
    if (tool.name === name) {
      return tool.CSP; // Return CSP if the name matches
    }
  }
  return 11; // Return null if no match is found
}