---
layout: post
title:  "Python을 이용한 Boj 웹 사이트 파싱 1 번째"
date:   2019-03-04 01:26:00 +0900
categories: [Boj-management]
tags: [python, parsing]
---

## Boj
[Backjoon online judge][boj]라는 알고리즘 문제 사이트의 문제를 풀다가 내가 제출한 문제의
소스 코드를 깃헙에 올리고 싶어졌다. 소스코드를 사이트에서 보기에는 조금 번거롭기도 하고 깃헙에 내가 풀어본
문제의 리스트를 정리하는 점이 좋을 것이라고 생각했다. 하지만 내가 하나하나 손수 코드를 올리기에는 200여개의
문제를 직접 확인해서 코드를 받고 다시 깃헙에 올리기는 너무 시간이 아깝게 느껴졌다.

사실은 이 문제를 해결하기 위한 프로그램으로 이미 지인의 [Boj-Autocommit][boj-autocommit]이라는 프로그램이 있다. 백그라운드로
사이트의 문제 제출 현황을 확인하여 최근 20개의 제출한 소스코드를 받아오고 이를 깃헙에 자동으로
commit을 올리는 프로그램이다. 하지만 나는 소스코드를 오랫동안 올리지 않아 최근 20개의 소스코드만
받아온다는 점이 꽤 아쉬웠고, 내 경우에는 깃처럼 내가 올리고 싶을 때에만 올리고 싶었기 때문에
백그라운드로 돌려 확인해오는 기능도 크게 의미 없었다.

그래서 이 코드를 fork 해온 후 내 나름대로 수정해서 사용할 지, 새로 작성할 지 생각하다가
어차피 크롤러를 만드는 것은 크게 어렵지 않으니 다른 사람의 코드를 이해하고 수정하기보다 새로 코드를 짜보기로 했다.
그리고 같은 기능만을 가진 프로그램은 큰 의미가 없다고 생각되어 추가로 이 사이트에서는 분류되지 않은
문제들이 있는데 이를 다른사람의 그 문제에 대한 제출코드의 데이터를 확인하여 분류가 없는
문제를 분류해보고자 했다.

### Parsing
지금까지 자바, C, C++, python, Javascript 등 많은 언어를 접해와서 어떤 언어를 사용하든 큰 문제가 없었다.
하지만 지금 만드려는 프로그램의 경우 프로그램의 속도도 별로 중요하지 않고 빠르게 개발하고 내가 사용하고자
했기 때문에 python 으로 개발하기로 정했다. 추가로 python에서 `urllib`라는 패키지를
이용해서 웹 사이트에 url 요청을 해본 경험도 있었기 때문에 익숙하다는 점도 파이썬을 선택하게 된 이유 중 하나였다.

#### urllib
`urllib`는 파이썬에서 내재된 패키지이기 때문에 추가적인 라이브러리를
받지 않아도 된다는 점 때문에 처음에는 url 요청을 하기 위한 라이브러리로 `urllib`를 사용하기로 했다.
urllib는 기본적으로 url에 요청을 보낼 때에 `urlopen`이라는 메소드를 이용해 요청할 수 있다.
이 때에 Request의 header를 추가한다던지, https의 ssl를 제거한다던지 하는 것은 임의로 추가할 수 있다.
간단히 말해 url을 지정한 이후 request를 보내고 그 response를 받는 것이다.
get, post를 지정할 필요도 없고 데이터가 들어가면 post형식으로 알아서 요청되는 것으로 알고 있다.

```python
request = Request(url)
context = ssl._create_unverified_context()
response = urlopen(request, data=data, context=context)
```

기본적으로 Request를 지정한 이후 ssl을 제거하기 위해 context를 unverified context로 만든 후에
response를 받는다. (사실 이건 https통신이 아닌 http통신으로 만들기 때문에 위험할 지도 모른다.)
이 때에 data를 지정할 수도 있고 하지 않을 수도 있다. urllib는 쉽게 사용할 수 있었고 큰 문제 없어보였다.

하지만 boj에서 로그인을 유지하기 위해 cookie를 이용해 로그인을 유지했는데 urllib를 이용해서 요청을 했을 때에
쿠키 값이 제대로 오지 않았다. (웹으로 로그인한 이후 얻은 쿠키의 값을 이용해 urllib로 요청할 경우는
제대로 되었던 것으로 보아 urllib로 받은 cookie가 잘못 받아졌을 것으로 추정된다.)

이 점을 해결하기 위해 구글링으로 찾아본 결과 urllib를 그대로 이용하는 해결책은 찾지 못했고
차선책으로 `requests`라는 패키지를 사용하게 되었다.

#### requests
requests도 처음에 urllib와 함께 고민했던 대상이었다. 앞에서 소개했던 프로그램에서 requests를 사용하고 있었고
rest api를 사용하는데 있어 파이썬에서 이미 많이 사용되고 있는 패키지였기 때문이다.
단지 프로그램에 굳이 많은 패키지를 install하고 싶지 않아서 사용하지 않은 패키지였다.
하지만 urllib에서의 문제가 무엇인지 모르겠지만 그 문제에 오래 시간을 할애하고싶지 않아 requests 패키지를
사용하는 것으로 문제를 해결하였다.

requests 패키지도 사용방법은 간단하였다.
```python
response = requests.get(url)
response = requests.post(url, data)
```

rest api중 GET일 경우 get함수로, POST일 경우 post 함수를 이용하여 url에 요청하면 쉽게 해결할 수 있었다.
놀랍게도 이 방법을 이용하여 요청하여 쿠키를 받으니 이전의 문제가 발생하지 않았다. (아마 지인의 프로그램도
같은 이유로 requests를 사용했을 것 같다.)

결국 requests패키지를 통해 [boj][boj]에 내가 풀어본 문제의 리스트를 모두 받은 이후 풀어본 문제의 제출한 소스코드를
확인하였다. 그리고 소스코드를 받아 파일을 정리해두려 했다.

#### BeautifulSoup
웹사이트에 요청만 하는 것만으로는 웹 파싱이라고 할 수 없었다. 내가 원하는 데이터는 html이 아닌 내부의 값들이므로
html을 다시 파싱해야 했다. 처음에는 정말 패키지를 받기 싫어서 문자열을 조작하는 방법으로 잘라내서 사용해볼까도
생각했지만 그런 개발에 걸리는 시간이 훨씬 더 크기 때문에 패키지를 받게 되었다.
패키지를 받기로 결정한 이상 가장 좋은 html 파싱 패키지를 사용해야겠다. 라고 생각하여 찾아보던 중
beautifulsoup 라는 패키지를 찾았다. (사실 이것 외에는 잘 보지 못했다...)

html의 태그로도 찾을 수 있고 클래스, id 를 통한 태그를 찾는 것도 가능했다.
```python
html = BeautifulSoup(response, 'html.parser')
tds = html.find('tbody').find('tr').find_all('td')
description = html.find(attrs={'id': 'problem_description'}).text
```

위와 같이 BeautifulSoup으로 rest api로 요청받은 값을 처리할 경우 html을 받을 수 있는데
이 값을 find 혹은 find_all을 통해 값을 처리할 수 있다.
find_all이라는 메소드를 사용할 경우 인자와 같은 값을 가지는 DOM을 모두 찾아오는 것 같다.
find의 경우 DOM 중 처음 만나는 값을 내보내고 (find_all을 하고 첫번째 값을 return한다..)
id나 class로 찾을 경우는 attrs parameter를 통해 찾을 수 있다.
간단하게 html을 파싱할 수 있어 BeautifulSoup을 사용하는데 어려움도 없었고 코드도 깔끔하게 작성할 수 있었다.

---

#### 이후

python을 이용해서 Web에 요청하여 html을 파싱하는데 큰 어려움은 없었다. 이제 이
데이터를 저장해두고, 데이터를 분석해야 한다. 이에 대해서는 다음 포스팅에서 다루겠다.

> [boj-management][boj-management] github repository

[boj]: https://www.acmicpc.net/
[boj-autocommit]: https://github.com/ISKU/BOJ-AutoCommit/
[boj-management]: https://github.com/HyeockJinKim/baekjoon-management/