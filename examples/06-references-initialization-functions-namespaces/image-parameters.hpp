// Interface declarations; Image and the functions are defined elsewhere.
struct Image;

void show(const Image& image);   // Read the image without copying it.
void blur(Image& image);         // Modify the original image.
void set_logo(const Image* logo); // nullptr means no logo.
void set_zoom(int percent);      // Copy a small value.
