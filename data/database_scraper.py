from bs4 import BeautifulSoup
import pandas as pd
import sqlite3

# Access HTML file
with open("./data/vivino_search_html_dump.html", "r") as html_dump:
    raw_data = BeautifulSoup(html_dump,"html.parser")

#Data specific class tags
full_card_class = "card__card--2R5Wh wineCard__wineCardContent--3cwZt"
brand_class = "wineInfoVintage__truncate--3QAtw"
vineyard_class = "wineInfoVintage__vintage--VvWlU wineInfoVintage__truncate--3QAtw"
value_score_class = "MuiTypography-root MuiTypography-body1 vivino-mui-ssvfeg-MuiTypography-root-bodyMedium"
average_rating_class = "vivinoRating_averageValue__uDdPM"
price_class = "addToCartButton__currency--2CTNX addToCartButton__prefix--3LzGf" #access through sibiling

# #Wine Card Unique Reference List
full_wine_ref = []

wine_cards = raw_data.find_all(class_=full_card_class)

for card in wine_cards:
    wine_reference = card.find_next('a').get('href')
    full_wine_ref.append(wine_reference)


#Building the wine profiles
complete_wine_profiles = []

for unique_href in full_wine_ref:

    wine_card = raw_data.find(href=unique_href)

    specific_vineyard = wine_card.find(class_=vineyard_class).text if wine_card.find(class_=vineyard_class) else "Unknown Vineyard"
    specific_brand = wine_card.find(class_=brand_class).text if wine_card.find(class_=brand_class) else "Unknown Brand"
    specific_value_score = wine_card.find(class_=value_score_class).text if wine_card.find(class_=value_score_class) else "No Score"
    specific_average_rating = wine_card.find(class_=average_rating_class).text if wine_card.find(class_=average_rating_class) else "No Rating"
    specific_price = wine_card.find(class_=price_class).nextSibling.text if wine_card.find(class_=price_class) else "No Price"
    specific_year = int(specific_vineyard[-4:]) if specific_vineyard[-4:].isdigit() else "Unknown Year"    

    wine_profile = {
        "brand": specific_brand,
        "vineyard": specific_vineyard[:-5],
        "year": specific_year,
        "value":specific_value_score,
        "average_rating":float(specific_average_rating),
        "price": float(specific_price),
    }

    complete_wine_profiles.append(wine_profile)

data_framework = pd.DataFrame(complete_wine_profiles)

SQL_connection = sqlite3.connect('vivino_database.db')

data_framework.to_sql('vivino_database_table',SQL_connection, if_exists='replace',index=False)

SQL_connection.close()