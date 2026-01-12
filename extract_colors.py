from PIL import Image
from collections import Counter
import sys

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def is_neutral(rgb, threshold=20):
    r, g, b = rgb
    # Check if close to white
    if r > 240 and g > 240 and b > 240:
        return True
    # Check if close to black
    if r < 15 and g < 15 and b < 15:
        return True
    return False

def extract_colors(image_path, num_colors=5):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize((150, 150))
        
        pixels = list(image.getdata())
        # Filter out neutrals
        filtered_pixels = [p for p in pixels if not is_neutral(p)]
        
        if not filtered_pixels:
            print("No non-neutral colors found. Returning all colors.")
            counts = Counter(pixels)
        else:
            counts = Counter(filtered_pixels)
            
        common_colors = counts.most_common(num_colors)
        
        print("Dominant Colors (Filtered):")
        for color, count in common_colors:
            print(rgb_to_hex(color))
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    img_path = r"C:\Users\admin\OneDrive\Documents\Pixel Play\Branding\Screenshot.png"
    extract_colors(img_path)