---
layout: post
title: "mermaid plugin 설정"
date:  2019-01-31 14:00:00 +0900
categories: web
tags: [jekyll, mermaid]
---
## Mermaid 설정 완료
[Mermaid][mermaid_link]라는 markdown에서 Diagram을 그리는데 좋은 프로젝트가 있길래 적용시켜보았다.
Jekyll에서 plugin으로 [jekyll-mermaid][jekyll_mermaid_link]가 있어서 플러그인을 적용시켰다.

Jekyll과 gem을 안 써봤어서 조금 난해했는데 그래도 적용하는데 성공했다.

## Mermaid 설정
jekyll의 mermaid를 적용하는 방법은 두가지가 있다. 이 두가지를 알아보자.
만일 mermaid의 색상을 조정하고 싶다면 `mermaid.js`의 색상을 검색해서 교체하여 수정할 수 있다.
* plugin을 설치해서 적용하는 방법
* script를 추가하는 방법


### 적용 순서
#### plugin을 설치하는 방법
1. [Mermaid][mermaid_link]를 설치하고 build한다.
    ```bash
    git clone https://github.com/knsv/mermaid

    cd mermaid
    yarn install
    yarn build
    ```

2. Mermaid의 dist에 생선된 js파일을 jekyll 프로젝트로 옮긴다.
    - 정리를 위해 js 폴더를 만들어 넣어둔다.

3. jekyll의 `_config.yml`파일에 jekyll-mermaid 플러그인을 추가한다.

   ```gem
    plugins:
      - 기존의 plugin
      - jekyll-mermaid

    # Plugin For Diagram
    mermaid:
      src: '<url>/<path>/mermaid.js'
   ```

4. `GemFile`파일에 dependency를 추가한다.

    ```gem
    group :jekyll_plugins do
      gem '기존의 plugin'
      gem 'jekyll-mermaid', '~> 1.0'
    end
    ```

5. gem으로 jekyll-mermaid를 install한다.
    ```bash
    gem install jekyll-mermaid
    ```

#### Script를 추가하는 방법
1. 아래의 코드를 mermaid를 사용할 layout의 head에 추가한다.
```html
  <script src="{{ "/js/mermaid.js" }}"></script>
```

2. 아래의 코드를 mermaid를 사용할 layout의 html에 추가한다.
    * theme는 default, forest, dark, neutral가 있다.

```html
  <script>
    var config = {
      startOnLoad:true,
      theme: 'neutral',
      flowchart:{
        useMaxWidth:false,
        htmlLabels:true
      }
    };
    mermaid.initialize(config);
    window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
  </script>
```

*Github page로 사용할 경우 plugin 추가가 불가능하기 때문에 Script추가를 사용하는 것이 간단함*

---

### 적용 결과
--------------------------------


#### Sequence Diagram
> 순서대로 진행되는 과정을 보여주기 좋음

``` markdown
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

--------------------------------

#### Graph LR, Graph TD Diagram
> Flow Chart 용도
> TD는 세로, LR은 가로

```markdown
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

```markdown
graph TD
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

```mermaid
graph TD
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

--------------------------------

#### Gantt Diagram
> Task 진행 순서를 보여주는 용도

```markdown
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
```

```mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
```

--------------------------------

#### Class Diagram
> Class 다이어그램

```markdown
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```

--------------------------------

#### Git Graph Diagram
> git 순서를 보여주는 용도

```markdown
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```

```mermaid
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```

[mermaid_link]: https://github.com/knsv/mermaid
[jekyll_mermaid_link]: https://rubygems.org/gems/jekyll-mermaid/versions/1.0.0
