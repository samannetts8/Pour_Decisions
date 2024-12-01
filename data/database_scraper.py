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
    rating_count_class = "vivinoRating_caption__xL84P"
    price_class = "addToCartButton__currency--2CTNX addToCartButton__prefix--3LzGf" #access through sibiling




full_wine_list = raw_data.find_all(class_= full_card_class)

for card in full_wine_list:
    
    

# for card in full_wine_list: