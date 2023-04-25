# Implementacija Analize in Statistike podatkov


## POMEMBNO
Priporočljivo je, da si za projekt ustvarite novo navidezno okolje (virtual environment) v lokalnem repozitoriju.

>pip install --user pipenv

>pipenv shell

Če dobite naslednji error:
pipenv : The term 'pipenv' is not recognized as the name of a cmdlet, function, script file, or operable program.
zaženite: 
>python -m pipenv shell

Za namestitev odvisnosti (dependency) iz requirements.txt poženite ukaz:
>pip install -r requirements.txt

Med razvojem nove odvisnosti (dependency) dodajajte v datoteko **requirements.txt**.
To lahko storite na roke v smislu:
>\<dependency-name>==\<verzija>

## Opis

Implementirana aplikacija je spletna aplikacija, ki pomaga podjetjem v industriji orodij analizirati svoje proizvodne podatke na celovit in eleganten način. Aplikacija vzame podatke iz vira podatkov, kot je datoteka Excel, in jih analizira z uporabo komponente na strežniški strani, ki je zgrajena s pomočjo Python Django ogrodja. Statistika, ki jo ustvari komponenta na strežniški strani, se nato prikaže s pomočjo komponente na strani odjemalca, ki je zgrajena s JS ogrodjem React in je uporabniku prijazna.

### Uporabljene Tehnologije

Aplikacija je bila zgrajena z uporabo naslednjih tehnologij:

- Python Django ogrodje: Komponenta na strežniški strani aplikacije je bila zgrajena z uporabo Django ogrodja.
- React JS ogrodje: Komponenta na strani odjemalca aplikacije je bila zgrajena z uporabo React ogrodja.
- HTML, CSS, JavaScript: Aplikacija uporablja HTML, CSS in JavaScript za ustvarjanje uporabniškega vmesnika.
- Knjižnica Pandas za obdelavo podatkov: Aplikacija uporablja knjižnico Pandas za obdelavo podatkov. Pandas zagotavlja močan nabor orodij za delo s strukturiranimi podatki, kar jo naredi idealno za obdelavo podatkov iz Excelovih datotek.

## Arhitektura Aplikacije
