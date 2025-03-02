import cv2
import pytesseract
import numpy as np
import io
import re

def process_image(file):
    # Read the file into a buffer
    in_memory_file = io.BytesIO(file.read())
    # Convert to numpy array for cv2
    file_bytes = np.asarray(bytearray(in_memory_file.read()), dtype=np.uint8)
    # Decode the image using cv2
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    if image is None:
        raise ValueError("Failed to decode image")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)
    return text

def image_to_text_array(image_text):
    text_clean = image_text.replace("\n", " ")
    scanned_text = text_clean.split()
    return scanned_text



def filter_wines(wines, scanned_words, field):
    def is_valid_word(word):
        return bool(re.match(r'^[A-Za-z]+$', word))  # Only keep alphabetic words
    

    wine_list = [{"brand": item["brand"], "vineyard": item["vineyard"]} for item in wines]

    excluded_tags = ["red", "white", "rose", "prosecco", "champagne",    "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black","gray", "cyan", "magenta", "lime", "teal", "maroon", "navy", "olive", "gold", "silver","beige", "ivory", "coral", "turquoise", "lavender", "indigo", "violet", "amber", "bronze","chartreuse", "crimson", "emerald", "sapphire", "ruby", "mint", "peach", "apricot", "plum","salmon", "khaki", "mustard",'Il']

    # Add list of connecting words to exclude when they are the only match
    connecting_words = {'and', 'the', 'of', 'a', 'an', 'in', 'on', 'at', 'by', 'for', 'to', 'with','let','Il'}
    
    def find_potential_matches(wine_list, words):
        potential_matches = []
        i = 0
        while i < len(words):
            if not is_valid_word(words[i]) or words[i].lower() in excluded_tags:
                i += 1
                continue
            
            phrase = words[i]
            # Skip if the only matching word is a connecting word 
            if phrase.lower() in connecting_words:
                i += 1
                continue
                
            # Split both the wine name and search phrase into words for exact matching
            matches = [wine for wine in wine_list 
                    if not any(wine.lower().startswith(tag.lower()) for tag in excluded_tags) and # Check for prefix matches
                    not any(tag in wine.lower().split() for tag in excluded_tags) and # Check for full word matches
                    set(phrase.lower().split()).issubset(set(wine.lower().split()))]
            
            j = i + 1
            while j < len(words) and matches:
                if not is_valid_word(words[j]) or words[j].lower() in excluded_tags:
                    j += 1
                    continue
                
                new_phrase = f"{phrase} {words[j]}"
                # Check if all words in new_phrase are present as complete words in the wine name
                new_matches = [wine for wine in matches 
                            if not any(tag in wine.lower().split() for tag in excluded_tags) and
                            set(new_phrase.lower().split()).issubset(set(wine.lower().split()))]
                
                if new_matches:
                    phrase = new_phrase
                    matches = new_matches
                else:
                    # Only add matches if they contain non-connecting words
                    if not all(word.lower() in connecting_words for word in phrase.split()):
                        potential_matches.extend(matches)
                    break
                
                j += 1
            
            i = j if j > i else i + 1
        
        return list(set(potential_matches))  # Remove duplicates      
    
    def remove_substring_duplicates(matches):
        unique_matches = []
        for match in matches:
            if not any(match in other for other in matches if match != other):
                unique_matches.append(match)
        return unique_matches
    
    if field == "vineyard":
        vineyards = [wine['vineyard'] for wine in wines]
        potential_vineyards = find_potential_matches(vineyards, scanned_words)
        potential_vineyards = remove_substring_duplicates(potential_vineyards)    
        return potential_vineyards
    elif field == "brand":
        brands = [wine['brand'] for wine in wines]            
        potential_brands = find_potential_matches(brands, scanned_words)
        potential_brands = remove_substring_duplicates(potential_brands)
        return potential_brands
    else:
        vineyards = [wine['vineyard'] for wine in wines]
        brands = [wine['brand'] for wine in wines]
        
        potential_vineyards = find_potential_matches(vineyards, scanned_words)
        potential_brands = find_potential_matches(brands, scanned_words)
        
        potential_vineyards = remove_substring_duplicates(potential_vineyards)
        potential_brands = remove_substring_duplicates(potential_brands)
        return potential_vineyards, potential_brands


# potential_vineyards= filter_wines(wine_list, scanned_text,"vineyard")
# potential_brands = filter_wines(wine_list, scanned_text,"brand")
# potential_vineyards, potential_brands = filter_wines(wine_list, scanned_text,"both")

# final_set = []
# for wine in dataset:
#     if wine['vineyard'] in potential_vineyards or wine['brand'] in potential_brands:
#         final_set.append(wine)

# print(scanned_text)
# print(f'Found {len(final_set)} potential matches')
# print("Potential Vineyards:", potential_vineyards)
# print("Potential Brands:", potential_brands)



# or wine['brand'] in potential_brands