# Project instructions

## Lectures and articles

- A lecture lives in the repository root as `NN-name.md` and is rendered twice: as a website page and as a Reveal.js deck. Keep writing lectures as sequences of `##` slides.
- An article lives in `articles/NN-name.md` and is rendered only as a website page. Use articles for practical notes — environment setup, tooling, recipes — that nobody presents from a stage. The slides profile excludes `articles/*.md`; keep it that way.
- Give every article a `title`, a one-sentence `description` and an `author` list in the front matter. Each author entry carries `name` and, when there is one, a `url` to reach them.
- Store article images under `assets/articles/<article-name>/` and article code under `examples/articles/<article-name>/`, where `<article-name>` matches the article filename without the `.md` extension. Reference them from the article with `../assets/...` and `../examples/...`, because Quarto resolves these paths relative to the document.
- Register a new article in two places: the `Статьи` section of the sidebar in `_quarto.yml` and the list on `index.md`.
- When an article is ported from an external source, keep the original wording and the author's voice; fix only outright typos, and close the article with a link to the original.
- Write article headings with `##` and `###`. `toc-depth` is 3, so a deeper heading disappears from the table of contents.

## Code examples in lecture slides

- Treat external source files as the source of truth for code shown on slides. Do not duplicate the same example inline in a lecture Markdown file.
- Store examples under `examples/<lecture-name>/`, where `<lecture-name>` matches the lecture filename without the `.md` extension. For example: `examples/00-introduction/hello-world.cpp`.
- Use lowercase kebab-case filenames that describe the example.
- Include a complete `.cpp` file in a Quarto slide with this form:

  ````markdown
  ```{.cpp filename="hello-world.cpp"}
  {{< include examples/00-introduction/hello-world.cpp >}}
  ```
  ````

- Keep the `include` shortcode on its own line. Display the basename through the `filename` attribute.
- Keep slide examples short and focused on one idea. Split a long example into several independently understandable files or slides instead of shrinking the code or relying on a large scroll area.
- Use `code-line-numbers` when highlighting supports the explanation. Reveal.js supports static ranges such as `code-line-numbers="3-7"` and progressive steps such as `code-line-numbers="|3|4-6|8"`.

## C++ style and validation

- Use C++20 unless a lecture explicitly demonstrates another language version.
- Format examples consistently: four-space indentation, opening braces on the same line, and no unused declarations or parameters.
- Prefer `int main()` unless command-line arguments are actually used.
- Examples intended to compile must pass Clang with `-std=c++20 -Wall -Wextra -pedantic` without warnings.
- If an example intentionally does not compile or intentionally demonstrates undefined or dangerous behavior, label that fact clearly on the slide or in speaker notes and do not present it as a runnable example.
- After changing an external example:
  1. compile it with Clang using the course flags;
  2. run it when it has meaningful runtime behavior;
  3. render the affected lecture with the slides profile;
  4. verify that the rendered slide contains the filename and the current source.

## Compiler Explorer links

- Add Godbolt links only when students benefit from editing or running the example interactively.
- A Godbolt permalink must contain the same source as the external `.cpp` file, use Clang and C++20, and open an executor panel when runtime output matters.
- Use a Markdown reference link whose definition has this form:

  ```markdown
  [godbolt-example-name]: <generated-url>
  <!-- godbolt source="examples/lecture/example.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
  ```

- `scripts/update-godbolt-links.mjs` scans the root lecture Markdown files, generates a self-contained Godbolt URL from each complete backing `.cpp` file, and moves its image button immediately after that example's closing code fence. Quarto runs it through `project.pre-render`, so rendering refreshes every registered URL and preserves the order code → button → explanation automatically.
- Treat a change to a `.cpp` file referenced by Godbolt as incomplete until the generator has run and the affected lecture has been rendered. Do not hand-edit the generated URL.
- Prefer self-contained `https://godbolt.org/#...` URLs over `/z/...` short links: the source travels in the URL and is not coupled to Godbolt's short-link storage or routing.
- Do not use `#include <https://...>` as the default way to load a course example from GitHub: it depends on publication, network access, and CORS, and leaves the primary editor showing an include directive instead of the directly editable example. It is acceptable for an intentionally external header-only dependency.
- Place the Compiler Explorer link immediately after the corresponding code block and render it as the compact image link below; do not expose a long encoded client-state URL on a slide.

  ```markdown
  [![](assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-example-name]{aria-label="Open in Compiler Explorer"}
  ```
