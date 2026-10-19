/*
 * Course metadata for the 33 vocational courses shown in the planner.
 * Titles, prerequisites and source links come from the official programme
 * record on namskra.is. Summaries condense each official course description.
 */
window.COURSE_INFO = {
  FRLA3RA05: {
    title: "Forritanleg raflagnakerfi I",
    summary: "Kynning á DALI- og Funk-bus-hússtjórnarkerfum. Nemendur hanna, velja búnað, tengja og forrita kerfi og ganga frá tæknilegum skjölum.",
    prerequisites: "Færni í almennum raflögnum, tengingu búnaðar og lestri raflagnateikninga og tækniskjala.",
    source: "https://www.namskra.is/courses/56cc1d3f62933a0316002b6e"
  },
  FRLA3RB05: {
    title: "Forritanleg raflagnakerfi II",
    summary: "Fjallað er um KNX-hússtjórnarkerfi, uppsetningu þess og forritun í ETS. Nemendur samþætta KNX, DALI og Funk-bus og vinna með birtu- og hitastýringar með orkusparnað að leiðarljósi.",
    prerequisites: "Færni í almennum raflögnum, tengingu búnaðar og lestri raflagnateikninga og tækniskjala.",
    source: "https://www.namskra.is/courses/56cc439862933a0316002c2d"
  },
  LYST3RB05: {
    title: "Lýsingatækni",
    summary: "Undirstöður hönnunar og frágangs lýsingarkerfa, val ljósgjafa og beiting reglugerða. Unnið er með birtu-, ljósflæðis- og kostnaðarútreikninga, mælingar og lýsingarforrit.",
    prerequisites: "Grunndeild rafiðna.",
    source: "https://www.namskra.is/courses/5557513062933a0313000684"
  },
  RAFL1GA03: {
    title: "Raflagnir grunndeildar rafiðna A",
    summary: "Grunnáfangi um starf rafiðnaðarmannsins, hegðun rafmagns, rofa, raflagnaefni og verkfæri. Áhersla er á einfaldar tengingar, fagleg vinnubrögð, öryggi og reglugerðir.",
    prerequisites: "Engar skráðar forkröfur.",
    source: "https://www.namskra.is/courses/559aebac62933a24fe00461e"
  },
  RAFL1GB03: {
    title: "Raflagnir grunndeildar rafiðna B",
    summary: "Farið er í framleiðslu og flutning rafmagns, reglur og staðla, rofa, íbúðarlagnir og greinatöflur. Nemendur tengja búnað og kynnast heimilistækjum og orkunotkun þeirra.",
    prerequisites: "RAFL1GA03 – Raflagnir grunndeildar rafiðna A.",
    source: "https://www.namskra.is/courses/557aca7c62933a7b3d00078f"
  },
  RAFL2GC03: {
    title: "Raflagnir grunndeildar rafiðna C",
    summary: "Áhersla er á varbúnað, val vírsverleika og uppbyggingu rafdreifiskápa og minni húsveitna. Nemendur vinna með lagnaleiðir, brunaþéttingar og varnir gegn snerti- og brunahættu.",
    prerequisites: "RAFL1GB03 – Raflagnir grunndeildar rafiðna B.",
    source: "https://www.namskra.is/courses/559aedd062933a24fe004626"
  },
  RAFL3GD03: {
    title: "Raflagnir grunndeildar rafiðna D",
    summary: "Tengingar og efnisval fyrir meðalstór boðskiptakerfi, svo sem tölvu-, síma-, dyrasíma-, loftnets- og ljósleiðarakerfi. Einnig er unnið með brunakerfi, mælingar og bilanaleit.",
    prerequisites: "RAFL2GC03 – Raflagnir grunndeildar rafiðna C.",
    source: "https://www.namskra.is/courses/559aee1062933a24fe004629"
  },
  RAFL3RE04: {
    title: "Raflagnir rafvirkjabraut",
    summary: "Uppbygging húsveitna allt að 100 A, heimtaugar, ljósa- og tenglagreinar og val rafdreifiskápa. Áhersla er á varnarráðstafanir, sérákvæði reglugerða og faglegan frágang.",
    prerequisites: "RAFL3GD03 – Raflagnir grunndeildar D.",
    source: "https://www.namskra.is/courses/5a33e520110a184116008048"
  },
  RAFM1GA05: {
    title: "Rafmagnsfræði og mælingar grunndeild A",
    summary: "Helstu hugtök og lögmál jafnstraums eru notuð við útreikninga og sannreynd með mælingum. Nemendur kynnast spennugjöfum, teiknitáknum og einföldum jafnstraumsrásum.",
    prerequisites: "Engar skráðar forkröfur.",
    source: "https://www.namskra.is/courses/559aef1162933a24fe004631"
  },
  RAFM2GB05: {
    title: "Rafmagnsfræði og mælingar grunndeildar B",
    summary: "Myndun og hegðun riðstraums, helstu lögmál og útreikningar í riðstraumsrásum. Verkefni eru leyst með reikningum og mælingum á rásum með viðnámum, þéttum og spólum.",
    prerequisites: "RAFM1GA05 – Rafmagnsfræði og mælingar grunndeildar A.",
    source: "https://www.namskra.is/courses/559aef4562933a24fe004634"
  },
  RAFM2GC05: {
    title: "Rafmagnsfræði og mælingar grunndeildar C",
    summary: "Útreikningar og mælingar á rað- og hliðtengdum RLC-rásum, spennuföllum, fasviki og samviðnámi. Einnig er fjallað um desibel, síur og tíðnieiginleika rása.",
    prerequisites: "RAFM2GB05 – Rafmagnsfræði og mælingar grunndeildar B.",
    source: "https://www.namskra.is/courses/559aef7262933a24fe004637"
  },
  RAFM3GD05: {
    // „Rafmangsfræði“ is the spelling in the official course title.
    title: "Rafmangsfræði og mælingar grunndeildar D",
    summary: "Nemendur leysa verkefni um notkun raforku og umbreytingu hennar í ljós, hita og hreyfiorku. Farið er í virkni véla og tækja, tengimyndir, teiknitákn og jafngildisrásir.",
    prerequisites: "RAFM2GC05 – Rafmagnsfræði og mælingar grunndeildar C.",
    source: "https://www.namskra.is/courses/559aefb062933a24fe00463a"
  },
  RAFM3RE05: {
    title: "Rafmagnsfræði og mælingar rafvirkjabraut A",
    summary: "Fjallað er um myndun þrífasa spennu, hverfisegulsvið og tengingar þrífasa kerfa og véla. Nemendur vinna með vektormyndir, afl og mælingar í þrífasa rásum.",
    prerequisites: "RAFM3GD05 – Rafmagnsfræði grunndeildar D.",
    source: "https://www.namskra.is/courses/559aefea62933a24fe00463d"
  },
  RAFM3RF05: {
    title: "Rafmagnsfræði og mælingar Rafvirkjabraut B",
    summary: "Skipulag raforkukerfa frá framleiðslu til dreifingar og uppbygging íslenskra lágspennukerfa. Áhersla er á öryggisráðstafanir, spennuföll, skammhlaup og val búnaðar.",
    prerequisites: "RAFM3RE05 – Rafmagnsfræði og mælingar rafvirkjabraut A.",
    source: "https://www.namskra.is/courses/559af05f62933a24fe004640"
  },
  RAST2RB05: {
    title: "Raflagna staðall",
    summary: "Staðlar og reglugerðir um raforkuvirki, öryggisreglur og framkvæmd þeirra. Nemendur læra um tengimáta, álags- og lekastraumsvarnir, jarðbindingar og notkun ÍST 200.",
    prerequisites: "Grunndeild rafiðna.",
    source: "https://www.namskra.is/courses/5557554762933a031300068f"
  },
  RATM2GA05: {
    title: "Rafeindatækni og mælingar grunndeildar A",
    summary: "Grunnur í hálfleiðurum með áherslu á díóður, afriðun og umbreytingu riðstraums í jafnstraum. Einnig er fjallað um virkni, forspennu og mælingar á transistorum.",
    prerequisites: "RAFM1GA05 – Rafmagnsfræði og mælingar grunndeildar A.",
    source: "https://www.namskra.is/courses/559af20f62933a24fe00464d"
  },
  RATM2GB05: {
    title: "Rafeindatækni og mælingar grunndeildar rafiðna B",
    summary: "Framhald í transistorum og notkun þeirra sem magnara. Nemendur kynnast meðal annars díak, tríak, týristor, FET-transistorum og aðgerðamögnurum og mæla virkni rása.",
    prerequisites: "RATM2GA05 – Rafeindatækni og mælingar grunndeildar A.",
    source: "https://www.namskra.is/courses/559af24f62933a24fe004650"
  },
  RLTK2RB05: {
    title: "Raflagnateikning",
    summary: "Lestur og gerð raflagnateikninga fyrir veitur að og með 63 A. Nemendur rissa og tölvuteikna, beita stöðlum og öryggisákvæðum og vinna með magn- og kostnaðartöku.",
    prerequisites: "Grunndeild rafiðna.",
    source: "https://www.namskra.is/courses/559af5b362933a24fe004676"
  },
  RLTK3RB05: {
    title: "Raflagnateikning",
    summary: "Teikningalestur og gerð raflagnateikninga fyrir þjónustu- og iðnaðarveitur allt að 200 A. Unnið er með grunn-, snið- og afstöðumyndir ásamt magn- og kostnaðartöku í tölvu.",
    prerequisites: "RLTK2RB05 – Raflagnateikning.",
    source: "https://www.namskra.is/courses/555757bb62933a031300069c"
  },
  RRVE2RA03: {
    title: "Rafvélar",
    summary: "Jafnstraumsmótorar og -rafalar, einfasa riðstraumsmótorar og spennubreytar. Nemendur tengja rafvélar, prófa þær, mæla og skrá niðurstöður og lesa merkiskilti.",
    prerequisites: "Lokið grunndeild rafiðna.",
    source: "https://www.namskra.is/courses/5a33dd3d110a184116007fd8"
  },
  RRVE2RB03: {
    title: "Rafvélar II",
    summary: "Jafnstraumsvélar, þrífasa riðstraumsmótorar, rafalar og spennubreytar. Nemendur tengja, prófa og mæla rafvélar og vinna úr upplýsingum á merkiskiltum og í tækniritum.",
    prerequisites: "RRVE2RA03 – Rafvélar I.",
    source: "https://www.namskra.is/courses/5a33de48110a184116007fe9"
  },
  SKYN2EÁ01: {
    title: "Almenn skyndihjálp",
    summary: "Mat og aðgerðir á vettvangi, endurlífgun og viðbrögð við blæðingu og losti. Einnig er fjallað um sár, bruna, höfuð-, háls- og hryggáverka og önnur algeng neyðartilvik.",
    prerequisites: "Engar.",
    source: "https://www.namskra.is/courses/5551c4eb62933a2f3d0002ef"
  },
  "STÝR1GA05": {
    title: "Stýritækni grunnnáms A",
    summary: "Grunnvirkni rofa, segulliða og tímaliða í stýri- og kraftrásum. Nemendur læra tákn og staðla, gera einlínu- og fjöllínumyndir og tengja einfaldar stýringar.",
    prerequisites: "Engar skráðar forkröfur.",
    source: "https://www.namskra.is/courses/559af29062933a24fe004654"
  },
  "STÝR2GB05": {
    title: "Stýritækni grunnnáms B",
    summary: "Kynning á loftstýringum, loftmeðhöndlun, lokum, strokkum og tengimyndum. Jafnframt er haldið áfram með rafstýringar og nemendur teikna, tengja og prófa kerfi.",
    prerequisites: "STÝR1GA05 – Stýritækni grunnnáms A.",
    source: "https://www.namskra.is/courses/559af2cf62933a24fe004657"
  },
  "STÝR3GC05": {
    title: "Stýritækni grunnnáms C",
    summary: "Yfirlit yfir segulliða-, loft-, rafeinda- og iðntölvustýringar. Áhersla er á kraft- og stýrirásir, mótorvarnir, ræsingar og hönnun og bilanaleit stýrikerfa.",
    prerequisites: "STÝR2GB05 – Stýritækni grunnnáms B.",
    source: "https://www.namskra.is/courses/559af30a62933a24fe00465a"
  },
  "STÝR3RD05": {
    title: "Stýritækni rafvirkjabraut",
    summary: "Skynjaratækni og notkun iðntölva í iðnstýringum. Nemendur tengja skynjara og jaðarbúnað, forrita stýringar og vinna með skjámyndakerfi og bilanaleit.",
    prerequisites: "STÝR3GC05 – Stýritækni grunnnáms C.",
    source: "https://www.namskra.is/courses/559af35162933a24fe00465d"
  },
  "TNTÆ1GA03": {
    title: "Tölvu- og nettækni grunndeildar A",
    summary: "Samsetning einkatölvu, hlutverk íhluta og uppsetning stýrikerfis og notendahugbúnaðar. Einnig er kynnt stafræn tækni, talnakerfi og grunnhugtök rökrása.",
    prerequisites: "Engar skráðar forkröfur.",
    source: "https://www.namskra.is/courses/559af3b762933a24fe004660"
  },
  "TNTÆ2GB05": {
    title: "Tölvu- og nettækni grunndeildar B",
    summary: "Grundvallaratriði stafrænnar tækni, sannleikstöflur og bólska algebru. Nemendur skilgreina og einfalda rökrásir með Karnaugh-kortum og vinna með stafræna íhluti.",
    prerequisites: "Samkvæmt skólanámskrá; áfanginn er framhald af TNTÆ1GA03.",
    source: "https://www.namskra.is/courses/56c4883562933a3c5d009c50"
  },
  "TNTÆ3GC05": {
    title: "Tölvu- og nettækni grunndeildar C",
    summary: "Uppbygging tölvuneta, netbúnaður og OSI- og TCP/IP-líkön. Megináhersla er á vélbúnað neta, stillingar, lagnir og grunnatriði reksturs og bilanaleitar.",
    prerequisites: "TNTÆ2GB05 – Tölvu- og nettækni grunndeildar B.",
    source: "https://www.namskra.is/courses/559af41662933a24fe004666"
  },
  VGRT1GA03: {
    title: "Verktækni grunnnáms A",
    summary: "Grunnatriði í smíði rafeindarása og efnisfræði íhluta. Nemendur læra að beita verkfærum, lóða og smíða einfaldar rásir með áherslu á öryggi og vönduð vinnubrögð.",
    prerequisites: "Engar skráðar forkröfur.",
    source: "https://www.namskra.is/courses/559af43962933a24fe004669"
  },
  VGRT2GB03: {
    title: "Verktækni grunnnáms B",
    summary: "Smíði rafeindarása, einfaldrar prentplötu og kassa úr málmi eða plasti eftir teikningu. Nemendur beita mælitækjum til að sannreyna virkni og finna bilanir.",
    prerequisites: "VGRT1GA03 – Verktækni grunnnáms A.",
    source: "https://www.namskra.is/courses/559af46662933a24fe00466c"
  },
  VGRT2GC04: {
    title: "Verktækni grunnnáms C",
    summary: "Notkun rásahermiforrita til að teikna, prófa og mæla einfaldar rafeindarásir. Nemendur smíða rás og prentplötu og bera raunverulega virkni saman við hermun.",
    prerequisites: "VGRT2GB03 – Verktækni grunnnáms B.",
    source: "https://www.namskra.is/courses/5a342a2f110a18411600846b"
  },
  VSME2GR05: {
    title: "Smáspennuvirki",
    summary: "Uppbygging, uppsetning og viðhald loftnets-, síma- og tölvulagnakerfa. Einnig er unnið með einföld bruna- og þjófavarnarkerfi og viðeigandi reglur og reglugerðir.",
    prerequisites: "Grunndeild rafiðna.",
    source: "https://www.namskra.is/courses/55575b3962933a03130006b1"
  }
};
