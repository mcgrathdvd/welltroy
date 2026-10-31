const paperRoute='/industries/retail-event-paper-bags/';
const pouchRoute='/industries/retail-stand-up-pouches/';
const wrapRoute='/industries/homeware-gift-honeycomb-wrap/';
export const secondaryBuyerProjects={
  'kraft-paper-bags':{
    title:'Plan a Kraft Bag Around the Retail Purchase',
    question:'What should a boutique check before buying custom kraft paper bags?',
    answer:'Measure the complete purchase with its box or tissue, specify the maximum carried weight, and trial the formed bag and handles. Approve the logo on the chosen kraft paper. A flat bag size or gsm figure alone does not establish fit, print appearance or a carrying rating.',
    buyers:[['Boutique owner','Choose everyday purchase combinations and a practical size range.'],['Retail purchasing team','Compare paper, handles, quantities per version and reorder references.'],['Store operations','Check insertion, loaded carrying and storage at the handover point.']],
    checks:['Confirm the dimension order, usable opening, formed base and handle clearance.','Ask for the exact paper, gsm, handle attachment and any offered reinforcement.','Compare kraft and gift-bag options using the same packed load and artwork brief.'],
    link:paperRoute,linkText:'See the retail and event paper bag project plan',
    brief:'Send the boxed item dimensions and weight, intended carrying use, kraft appearance, logo, quantity per size/design and delivery destination.',
    faqs:[
      {q:'Can a kraft retail bag carry any product that fits inside?',a:'Fit alone does not establish carrying strength. Confirm paper, handle attachment, base and any reinforcement for the actual weight, then approve a loaded sample under the intended use conditions.'},
      {q:'Should our shop use one paper bag size for every purchase?',a:'Compare your common purchase combinations, including boxes and tissue. One size may simplify stock, while leaving excess space or failing larger orders. Trial the actual mix before selecting a small range of sizes.'},
      {q:'Can a handled kraft bag be the outer parcel pack?',a:'This range is intended for retail presentation and carrying. For courier delivery, choose and test a suitable outer shipping pack for the actual contents.'}
    ]
  },
  'paper-gift-bags':{
    title:'Plan Gift Bags for the Complete Kit and Handover Date',
    question:'What should an event team send for a custom gift bag quotation?',
    answer:'Send the complete gift kit dimensions and weight, quantity per size and artwork, paper and handle preferences, logo files, delivery locations and required arrival date. Approve a loaded carrying sample and the print reference; include time for revision before the event.',
    buyers:[['Gift or beauty retailer','Match the boxed gift, tissue and presentation level.'],['Event agency or marketing team','Coordinate artwork, version quantities and venue deadlines.'],['Assembly and procurement team','Check kit fit, loaded handles and quantities allocated to each location.']],
    checks:['Assemble the actual gift set before measuring the opening, base and handle area.','Confirm paper, color, handle and print finish for the selected bag; a catalogue picture is a reference.','Record the artwork revision, approval owner and arrival milestone for each event or store.'],
    link:paperRoute,linkText:'Plan paper bags for boutiques, gifts and events',
    brief:'Send kit contents, packed dimensions and weight, design files, color reference, quantity per version, delivery locations and event date.',
    faqs:[
      {q:'Can I combine several event designs into one minimum order?',a:'List each size, paper, color and artwork quantity separately. Ask for the applicable setup and minimum for each version instead of relying on the total quantity.'},
      {q:'Does a paper gift bag protect a glass gift during shipping?',a:'A presentation bag does not establish transit protection. Assess the glass item, closure where relevant, inserts, cushioning and suitable outer shipping packaging as a complete pack.'},
      {q:'How should we schedule bags for a fixed event date?',a:'Work back from the required arrival at each location. Agree proof, loaded-sample approval, production and transport milestones in writing, including time for revisions and assembly.'}
    ]
  },
  'stand-up-pouches':{
    title:'Start with the Product and the Person Who Fills It',
    question:'Can I select a stand-up pouch from fill weight alone?',
    answer:'No. Product density and shape, the gusset, zipper, headspace and seal area affect usable capacity. Trial the actual product and filling process in a sample. Specify the contents, storage and destination before agreeing the material, closure and any required documentation.',
    buyers:[['Craft or accessory brand','Organize item counts, visibility, labels and customer reclosing.'],['Snack product team','Define the food, fill, storage and evidence required for the selected market.'],['Filler and procurement team','Check filling access, sealing, SKU artwork and the approved structure.']],
    checks:['Fill each real SKU to the target amount; check opening, seal clearance and standing shape.','Confirm the complete material structure and any product-specific barrier or suitability evidence.','List quantity per size, structure and design. Confirm the minimum for the offered catalogue or custom printing route.'],
    link:pouchRoute,linkText:'See the retail pouch launch and filling plan',
    brief:'Send contents, fill amount, storage, filling/sealing method, size or sample target, required evidence, artwork versions, quantities and destination.',
    faqs:[
      {q:'Will a 250 g pouch fit 250 g of a different product?',a:'Not necessarily. Equal weights can occupy different volumes. Test the real contents with the intended headspace, closure and top seal before adopting another product’s pouch size.'},
      {q:'Does a resealable zipper replace the first seal?',a:'A zipper supports reclosing; it does not by itself establish the initial seal, leak resistance or tamper evidence. Confirm the initial sealing process and trial it with the actual product and equipment.'},
      {q:'Do all custom pouch designs start at 500 pieces?',a:'Do not assume one minimum covers every pouch. The made-to-order supplier example lists 1,000 pieces, while other eligible specifications can differ. Confirm the selected size, structure, print route and quantity for each artwork version in the quotation.'}
    ]
  },
  'honeycomb-paper-rolls':{
    title:'Choose Rolls from a Repeatable Packing Trial',
    question:'How can a gift seller compare honeycomb paper roll costs?',
    answer:'Compare the same width, paper specification and roll-length basis, then measure unexpanded paper used per completed pack, including waste. Include packing time and the rest of the shipping pack when comparing cost. A roll price alone does not show cost per protected order.',
    buyers:[['Handmade gift seller','Check presentation, surface contact and coverage around each gift.'],['Homeware brand','Identify fragile parts and test the full wrap, insert and carton combination.'],['Warehouse or purchasing team','Record consumption, packing time, workstation needs and roll replenishment.']],
    checks:['Start with 1 roll (1 pc) to trial the actual product, vulnerable edges, width, expansion and overlap.','Confirm nominal unexpanded roll length, core and roll dimensions; ask separately about interleaf or dispenser needs.','Use the measured consumption and waste to plan repeat orders. Enter the quantity in complete rolls.'],
    link:wrapRoute,linkText:'Plan homeware and gift wrapping operations',
    brief:'Send item dimensions, weight and fragile parts, current carton, trial cut length, roll width/length/color, quantity in rolls and destination.',
    faqs:[
      {q:'Should consumption be measured before or after expanding the paper?',a:'Use the same basis as the quoted roll length. Record unexpanded paper drawn from the roll per completed pack, plus waste, and confirm the supplier’s nominal length convention. Do not compare an expanded coverage measurement directly with an unexpanded roll length.'},
      {q:'What should a warehouse trial besides paper coverage?',a:'Record time per pack, repeatability, waste, workstation and dispenser needs, carton fit, item separation and results of the complete-pack checks. Use the actual order mix and packing team.'},
      {q:'Does 1 pc mean one complete honeycomb paper roll?',a:'Yes. The minimum is 1 complete roll (1 pc), not one cut sheet. Confirm width, roll length, color and paper specification when ordering. You can use one roll for a packing trial before planning repeat quantities.'}
    ]
  }
};
