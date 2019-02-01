---
layout: post
title: "mermaid 설정"
date:  2019-01-31 14:00:00 +0900
categories: jekyll update
---
## Mermaid 설정 완료
[Mermaid][mermaid_link]라는 markdown에서 Diagram을 그리는데 좋은 프로젝트가 있길래 적용시켜보았다.
Jekyll에서 plugin으로 [jekyll-mermaid][jekyll_mermaid_link]가 있어서 플러그인을 적용시켰다.

Jekyll과 gem을 안 써봤어서 조금 난해했는데 그래도 적용하는데 성공했다.

### 적용 순서

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

### 적용 결과

--------------------------------

#### Sequence Diagram
> 순서대로 진행되는 과정을 보여주기 좋음

``` md
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

{% mermaid %}
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
{% endmermaid %}

--------------------------------

#### Graph LR, Graph TD Diagram
> Flow Chart 용도
> TD는 세로, LR은 가로

```md
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

{% mermaid %}
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
{% endmermaid %}

```md
graph TD
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

{% mermaid %}
graph TD
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
{% endmermaid %}

--------------------------------

#### Gantt Diagram
> Task 진행 순서를 보여주는 용도

```md
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
```

{% mermaid %}
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
{% endmermaid %}

--------------------------------

#### Class Diagram
> Class 다이어그램

```md
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

{% mermaid %}
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
{% endmermaid %}

--------------------------------

#### Git Graph Diagram
> git 순서를 보여주는 용도

```md
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
{% mermaid %}
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
{% endmermaid %}

[mermaid_link]: https://github.com/knsv/mermaid
[jekyll_mermaid_link]: https://rubygems.org/gems/jekyll-mermaid/versions/1.0.0
