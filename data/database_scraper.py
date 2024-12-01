from bs4 import BeautifulSoup

# Access HTML file
with open("./data/vivino_search_html_dump.html", "r") as html_dump:
    raw_data = BeautifulSoup(html_dump,"html.parser")

#wine_card_context class = card__card--2R5Wh wineCard__wineCardContent--3cwZt
# full_wine_list = [tag.text for tag in raw_data.find_all(class_="wineInfoVintage__vintage--VvWlU wineInfoVintage__truncate--3QAtw")]
    full_card_class = "card__card--2R5Wh wineCard__wineCardContent--3cwZt"
    brand_class = "wineInfoVintage__truncate--3QAtw" #same as vineyard_class, must exclude "wineInfoVintage__vintage--VvWlU"
    vineyard_class = "wineInfoVintage__vintage--VvWlU wineInfoVintage__truncate--3QAtw"
    value_score_class = "MuiTypography-root MuiTypography-body1 vivino-mui-dd3lp3-bodyMedium"
    average_rating_class = "vivinoRating_averageValue__uDdPM"
    price_class = "addToCartButton__currency--2CTNX addToCartButton__prefix--3LzGf" #access through sibiling

full_wine_list = raw_data.find_all(class_= full_card_class)

wine_profile = {
    "brand": str,
    "vineyard": str,
    "year": int,
    "value":str,
    "average_rating":int,
    "ratings_tally": int,
    "price": int
}

complete_wine_profiles = []


# full_vineyard_list = [tag.text[:-5] for tag in raw_data.find_all(class_= vineyard_class)]

# for card_tag in full_wine_list:
card_tag = full_wine_list[0]
    
specific_vineyard = raw_data.find(class_=card_tag).findChild(class_=vineyard_class).text
specific_brand = raw_data.find(class_=card_tag).findChild(class_=brand_class).text
specific_value_score = raw_data.find(class_=card_tag).findChild(class_=value_score_class)
specific_average_rating = raw_data.find(class_=card_tag).findChild(class_=average_rating_class).text
specific_price = raw_data.find(class_=card_tag).findChild(class_=price_class).nextSibling.text

wine_ref_label = specific_brand+" - "+ specific_vineyard

wine_profile[wine_ref_label] = {
    "brand": specific_brand,
    "vineyard": specific_vineyard[:-5],
    "year": int(specific_vineyard[-4:]),
    "value":specific_value_score,
    "average_rating":float(specific_average_rating),
    "price": float(specific_price)
}

complete_wine_profiles.append(wine_profile)

print(complete_wine_profiles)