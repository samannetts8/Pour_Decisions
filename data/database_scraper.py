from bs4 import BeautifulSoup

# Access HTML file
with open("./data/vivino_search_html_dump.html", "r") as html_dump:
    raw_data = BeautifulSoup(html_dump,"html.parser")

#Data specific class tags
full_card_class = "card__card--2R5Wh wineCard__wineCardContent--3cwZt"
brand_class = "wineInfoVintage__truncate--3QAtw"
vineyard_class = "wineInfoVintage__vintage--VvWlU wineInfoVintage__truncate--3QAtw"
value_score_class = "MuiTypography-root MuiTypography-body1 vivino-mui-dd3lp3-bodyMedium"
average_rating_class = "vivinoRating_averageValue__uDdPM"
price_class = "addToCartButton__currency--2CTNX addToCartButton__prefix--3LzGf" #access through sibiling

#Wine Card Unique Reference List
total_wine_count = len(raw_data.find_all(class_= full_card_class))
starting_wine_tag = raw_data.find(class_= full_card_class)
full_wine_ref = []

while starting_wine_tag:
    wine_reference = starting_wine_tag.find_next('a').get('href')
    full_wine_ref.append(wine_reference)    
    starting_wine_tag = starting_wine_tag.find_next(class_= full_card_class)


#Building the wine profiles
complete_wine_profiles = []
i = 0

while i < 4:

    card_tag = full_wine_ref[i]

    specific_vineyard = raw_data.find(href=card_tag).find(class_=vineyard_class).text
    specific_brand = raw_data.find(href=card_tag).find(class_=brand_class).text
    specific_value_score = raw_data.find(href=card_tag).find(class_=value_score_class)
    specific_average_rating = raw_data.find(href=card_tag).find(class_=average_rating_class).text
    specific_price = raw_data.find(href=card_tag).find(class_=price_class).nextSibling.text

    wine_profile = {
        "brand": specific_brand,
        "vineyard": specific_vineyard[:-5],
        "year": int(specific_vineyard[-4:]),
        "value":specific_value_score,
        "average_rating":float(specific_average_rating),
        "price": float(specific_price),
    }

    complete_wine_profiles.append(wine_profile)