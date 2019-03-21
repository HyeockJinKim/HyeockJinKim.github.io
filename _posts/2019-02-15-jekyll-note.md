---
layout: post
title:  "Jekyll 정리"
date:   2019-02-15 00:21:30 +0900
categories: [web]
tags: [jekyll]
liquid_example: "{{ name }}"
---

네이버 블로그, 티스토리 등을 뒤로 하고 github에서 지원하는 github 블로그를 사용하게 되었습니다.
데이터베이스를 사용하는 동적 사이트는 어느정도 알고 있지만 정적 사이트는 쉽게 접해보지 못했습니다. 그래서
이번 기회에 정적 사이트 생성기 중 하나인 Jekyll에 대해 간단하게 정리해보았습니다.

## Jekyll

정적 사이트 생성기로 블로그를 생성하거나 포스팅하는 용도로 자주 사용합니다. 텍스트파일(markdown)으로 내용을
작성하여 HTML 템플릿과 합쳐 어떤 서버에서도 올바르게 작동하는 웹 사이트를 제공합니다.
Github Page에서 Jekyll을 지원하고 있습니다.

## 정적 사이트 vs 동적 사이트

제가 기본적으로 Node.js, Django, php 등 서버 프레임 워크를 사용하면서 접해본 서버는 기본적으로 동적 사이트입니다.
동적 사이트의 경우 HTML틀을 지정해 둔 후 **데이터베이스**에서 데이터를 받아 HTML 틀에 값을 넣고
클라이언트가 원하는 페이지의 데이터가 들어간 가공된 HTML 파일을 클라이언트에 전해주게 됩니다.
이렇게 사용할 때 기본 html 틀만 작성하면 클라이언트에 여러 페이지를 보여줄 수 있게 됩니다.

정적 사이트는 어떨까요? 동적 사이트와 반대다. 라고 생각하면 쉽게 알 수 있듯이 모든 페이지를 파일로 저장해두는 방식입니다.
굉장히 비효율적으로 보이지만 블로그의 포스팅 용도로는 생각보다 나쁘지 않습니다. 또한 데이터베이스가 필요하지 않고 파일만
그대로 클라이언트에게 전송하는 것만으로 서버를 운영할 수 있습니다. (markdown으로 작성된 파일은 컴파일 하듯이
HTML 파일로 생성되어있습니다.) 심지어 백업도 파일을 저장해두는 것만으로 블로그의 포스팅들이 모두 보존됩니다.

속도 면에서도 처리를 해주어야 하는 동적사이트에 비해 정적 사이트가 더 빠릅니다. 동적으로 데이터베이스에서 값을 꺼내
페이지를 생성하는 작업이 필요없으므로 그만큼 더 빠른 결과를 얻을 수 있습니다. 만일 동적인 작업이 필요하지 않은
Document 페이지같은 경우 정적 사이트로 만들어 둘 만 합니다.

## Markdown

Markdown 언어는 텍스트 문법의 양식 중 하나입니다. 흔히 `README.md`를 github에서 사용하는 것을 보았을 것입니다.
Markdown은 HTML파일로 쉽게 변환할 수 있고 문법도 간단해 쉽게 깔끔한 문서 작업을 할 수 있습니다.

### Frontmatter
Jekyll의 HTML, Markdown 파일의 상단에는 아래와 같은 내용을 볼 수 있습니다.
```markdown
---
layout: post
title:  "Welcome to Jekyll!"
date:   2019-01-30 19:26:47 +0900
categories: jekyll update
---
```
이걸 front matter라고 합니다. Jekyll은 데이터베이스를 사용하지 않는데 이 때 파일을 어떻게 처리할 지를
HTML이나 Markdown 파일의 front matter에 적어 처리하는 것입니다. 혹은 이 페이지에서 변수처럼 저장해두고
같은 값을 호출하게 해주고 싶을 때에도 front matter를 통해 해결할 수 있습니다.

이 중 layout은 `_layouts`폴더에 저장된 layout 틀을 지정합니다. 만일 `_layouts`폴더가 없다면 Jekyll의
Default 설정으로 layout이 설정 되는 듯 합니다. title은 브라우저에 보이는 타이틀을 지정합니다.
date는 작성된 날짜를 지정합니다. categories는 카테고리를 지정하는데 사용합니다. category로 쓸 경우
단수, categories로 쓸 경우 복수로 카테고리를 지정할 수 있게 됩니다.

frontmatter 외에도 Jekyll에서 Markdown 파일을 처리하기 위해 해야하는 작업이 있습니다. 파일의 이름을 지정해야 합니다.
물론 어떤 파일이든 파일 이름을 지정해야하지만 Jekyll의 파일이름은 조금 다릅니다.
```bash
yyyy-mm-dd-Title-Of-Post.md
// example
2019-02-07-welcome-to-jekyll.md // .markdown도 가능하다.
```

`_posts`에 post를 저장할 때에 파일이름을 위와 같이 날짜-파일이름의 식으로 파일을 만들어야 합니다.

## Structure
Jekyll이 정적 사이트 생성기라고 모든 페이지를 전부 개발자가 하드코딩해서 파일로 만들어 두는 것이 아닙니다.
제가 느낀 바로는 페이지를 만드는 것은 동적 페이지와 크게 다르지 않습니다. 동적 페이지의 경우 기본 틀만을 가지고 있고
데이터베이스의 정보를 추가하여 클라이언트에 보내주는 방식이지만 정적페이지는 미리 모든 페이지를 만들어두는 차이입니다.
이런 작업을 위해 Jekyll에도 여러 디렉토리가 있습니다.

### _layouts
_layouts 폴더에는 Jekyll에서 사용할 기본 틀인 html을 지정할 수 있습니다.
만일 _layouts 폴더에 `home.html`이라는 파일을 작성해두고 markdown의 front matter에
 `layout: home`으로 지정한다면 해당 html파일에 내용이 들어가게 됩니다.

### _posts
_posts 폴더에서는 포스트를 위해 작성한 markdown을 넣어둡니다. _posts폴더에 있는 포스팅 파일들은
 _layouts폴더의 레이아웃과 합쳐져 페이지를 만듭니다.

### _includes
_includes 폴더에는 레이아웃을 만들다보면 공통적으로 들어가는 component같은 경우 이 폴더에 두어 재사용성을 높입니다.
혹은 layout파일이 너무 커질 경우 가독성을 좋게 하기 위해서도 부분을 나누어 component 처럼 사용하고 include폴더에 넣습니다.
_layouts의 html파일에는 front matter가 없어도 됩니다.

### _data
_data 폴더에는 csv와 괕은 데이터 파일을 두고 이 파일을 사용할수 있게 합니다.

### _sites
_sites 폴더는 jekyll이 build되었을 때의 모든 정적페이지를 가지고 있는 폴더입니다.
정적 사이트를 띄울 경우에는 _sites폴더만 있으면 서버를 열 수 있습니다.
하지만 github에 올릴 경우에는 다른 폴더와 파일을 통해 만들 수있는 파일이므로 `.gitignore`에
_sites폴더를 적어두어 이 폴더가 github에 올라가지 않도록 합니다.

### assets
assets는 javascript, css파일을 저장해두는 폴더로 assets로 굳이 두지 않더라도 되지만 관리를
용이하게 하기위해 폴더를 두어 관리합니다. 보통 폴더의 이름은 images, css, js 와 같이 안에
 들어있는 파일의 내용을 알 수 있게 합니다.

### page
page 폴더에는 고정으로 받을 페이지를 지정할 수 있습니다. about.md와 같이 다른 폴더에 들어가지 않은 파일의 경우
page 폴더에 정리해두어 코드를 정리합니다. 이 경우 permalink 라는 값을 front matter에 지정하여 어떤 url을
입력받았을 때에 해당 페이지가 나오는지 지정할 수 있습니다.

## Liquid 태그

Jekyll에서 사용하는 태그로 웹 개발을 해보았다면 보았을 법한 문법입니다.
```markdown
Hello, {{ page.liquid_example }}
```

위와 같은 방식으로 name이라는 값을 HTML파일에 적는 것이 아닌 외부에서 값을 받아와 적게 되는 방식으로 사용합니다.
 값을 대입하는 것 외에도 if나 for문을 이용하여 화면에 반복되거나 보여지지 않을 화면을 정의할 수 있습니다.

### Liquid 태그를 code 태그에 넣고 싶다면?
참고로 위와 같이 liquid 태그를 code 태그 내에 넣고 싶다면 front matter의 variable에 liquid 태그를 적고
code 태그 내에서 page.<variable_name>을 호출하여 liquid tag를 받아오게 해서 집어넣을 수 있습니다.
단순히 code 태그 내에 liquid태그를 집어넣을 경우 liquid 태그가 변환되어 liquid 태그를 보일 수 없게 됩니다.


> Written with [StackEdit](https://stackedit.io/).
