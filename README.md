# Námsplan rafvirkjabrautar FB

Gagnvirk, sjálfstæð framendaklónun á námsplaninu á [fbrafvikjunannarplan.netlify.app](https://fbrafvikjunannarplan.netlify.app/). Verkfærið hjálpar nemendum að raða fagáföngum rafvirkjabrautar Fjölbrautaskólans í Breiðholti á annir, skoða árekstra í stundatöflu og halda utan um námsframvindu.

## Tilgangur

Rafvirkjabrautin er 262 eininga iðnnám sem undirbýr nemendur fyrir lögverndað starf rafvirkja og sveinspróf. Námið sameinar bóklegt og verklegt nám við starfsþjálfun og tekur meðal annars til raflagna, mælinga, stýringa, rafvéla, lýsingar og netkerfa.

Þessi vefur sýnir **33 fagáfanga, samtals 141 einingu**. Hann er því skipulagsverkfæri en **ekki fullkomið yfirlit yfir allar 262 einingar brautarinnar**: almennir áfangar, íþróttaval og 80 eininga starfsþjálfun eru ekki hluti af töflunni. Endanlegt námsplan ætti alltaf að staðfesta hjá námsráðgjafa.

## Helstu eiginleikar

- dagskólaplan og tvær útgáfur af kvöldskólaplani;
- draga og sleppa áföngum milli anna;
- snertivæn færsla með `⇄` hnappi;
- vista staðsetningu og lokna áfanga sjálfkrafa í `localStorage`;
- greina skörun í stundatöflu og undanfara sem vantar;
- sía vikur og lita áfanga eftir degi, námsgrein eða önn;
- sýna **kóða og fullan titil á hverri áfangapillu**;
- aðgengilegur upplýsingagluggi á `i` hnappi með samantekt, einingum, forkröfum og heimild;
- útflutningur á núverandi uppröðun sem texti;
- ljós og dökk ásýnd eftir stillingu stýrikerfis.

## Keyrsla

Engar byggingareiningar eða ytri JavaScript-pakkar eru nauðsynlegir. Keyrðu einfaldan vefþjón í rót verkefnisins:

```bash
python3 -m http.server 8080
```

Opnaðu síðan <http://localhost:8080>.

## Uppbygging kóðans

```text
index.html          Merkingarfræðileg síðuuppbygging og upplýsingagluggi
styles.css          Útlit, námskrártafla, stundatafla og skalanleg snjallsímaásýnd
course-data.js      Heiti, samantektir, forkröfur og heimildaslóðir áfanga
app.js              Gögn um tímasetningar, ástand, localStorage og öll samskipti
assets/fb-logo.png  Merki skólans úr upprunalega vefnum
```

### Ástand og vistun

`app.js` heldur einu ástandsobjekti fyrir valið námsfyrirkomulag:

- `plan`: áfangakóði → önn;
- `done`: loknir áfangar;
- `muted`: áfangar sem eru grámaðir/settir til hliðar;
- `n`: fjöldi anna;
- `week`: virk vikusía;
- `colorMode`: valin litaskýring;
- `semesterHistory`: áfangar sem voru merktir loknir með önn í heild.

Hvert námsfyrirkomulag fær sinn `localStorage` lykil svo breytingar á einu plani raski ekki hinum. `render()` endurteiknar allar afleiddar birtingar út frá sama ástandi: námskrá, stundatöflu, framvindu, aðvaranir, liti og útflutning.

### Árekstrar og undanfarar

Árekstur finnst þegar tveir áfangar eru á sömu önn, tímabil þeirra skarast og þeir eru kenndir á sömu vikum. `PREREQUISITES` í `app.js` skráir bein tengsl milli áfanga; undanfari telst uppfylltur ef honum er lokið eða hann er tekinn á fyrri eða sömu önn (til dæmis fyrri 8 vikur annarinnar á undan framhaldsáfanga seinni 8 vikurnar).

### Upplýsingagluggar

`course-data.js` geymir stuttar íslenskar samantektir sem unnar eru úr opinberum lýsingum. `openCourseInfo()` fyllir eitt endurnýtanlegt `<dialog>` með gögnum valins áfanga. Hnappurinn er aðgengilegur með lyklaborði, glugginn styður `Esc`, og hver færsla tengir í alla lýsinguna.

## Heimildir og gagnatakmarkanir

- [Opinber brautarlýsing á Námskrá.is](https://www.namskra.is/programmes/6a5a7f6b-b975-427a-8dac-6c8d15982679)
- [Rafvirkjabraut FB](https://www.fb.is/rafvirkjabraut)
- [Upprunalegt námsplan](https://fbrafvikjunannarplan.netlify.app/)

Titlar, einingafjöldi, forkröfur og samantektir eru byggð á opinberum áfangalýsingum Námskrár. Tímasetningar og grunnuppröðun koma frá upprunalega námsplaninu og geta breyst milli anna. Athuga skal núverandi framboð hjá skólanum.

Upprunaleg hugmynd og hönnun námsplans: Bergvin Snær Andrésson.
