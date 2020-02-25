---
layout: post
title:  "영지식 증명"
date:   2020-02-25 22:35:00 +0900
categories: [Cryptography]
author: 김혁진
tags: [Zero-Knowledge proofs]
---

작년 2019년에 대학원에 입학한 후 블록체인에 대해 공부하고 있습니다. 블록체인은 모든 정보를 공개하고 중앙 서버 없이
기능을 수행할 수 있다는 장점이 있지만 블록체인에는 아직 해결해야할 이슈가 많이 있습니다. 속도가 굉장히 느려 실제 필드에서
사용하기 어렵다는 확장성 문제, 이러한 속도 문제를 해결하려다 보니 블록체인의 탈중앙성을 해치게 되는 중앙화 문제, 
위의 문제를 해결할 때 블록체인 네트워크가 악의적인 유저에 의한 공격이 가능해지는 보안 문제의 블록체인의 트릴레마라는
문제가 발생합니다. 블록체인에서 셋 중 어느 하나를 해결하려 할 때 다른 두 문제가 더 심해지는 상황이 발생합니다.

최근에는 위의 트릴레마 문제만이 아닌 프라이버시 문제가 크게 대두되고 있습니다. 블록체인에서는 모든 정보가 모든 사람에게
공개하여 악의적인 조작을 막습니다. 이 방법은 악의적인 공격은 막을 수 있지만 값의 프라이버시를 보장하지 못합니다.
예를 들어 이더리움에서는 스마트 컨트랙트라고 하여 분산 환경에서의 프로그램의 실행을 보장하는 프로그램이 있습니다.
스마트 컨트랙트에서는 프로그램의 실행은 보장하지만 입력 인자가 모든 사람들에게 공개되기 때문에 개인정보를 다루는 작업을
다루기 어렵습니다.

## 영지식 증명

이러한 문제를 막기 위해 사용할 수 있는 것이 바로 영지식 증명입니다. 영지식 증명은 `completeness`,
`soundness`, `zero-knowledgeness`의 세가지 성질을 만족시키는 암호 알고리즘으로 자신의 비밀 값을 드러내지 않고
비밀 값이 어떠한 조건을 만족하는 지 확인할 때 사용할 수 있는 암호 알고리즘입니다.

* completeness
    * 어떤 statement가 참이고 Prover와 Verifier가 protocol을 따르면 Verifier가 동의할 수 있어야 한다.

* soundness
    * 어떤 statement가 거짓이고 Verifier가 protocol을 따르면, Verifier에게 이 statement가 사실이라고 납득시킬 수 없어야 한다.

* zero-knowledgeness
    * 어떤 statement가 참이고 Prover가 protocol을 따르면, Verifier는 statement의 참, 거짓 외에는 아무 정보도 알 수 없어야 한다.

* statement
    * 증명하고자 하는 정보

예를 들어 자신이 성인임을 증명하려면 주민등록증을 보여 자신의 생년월일과 현재 날짜를 통해 19세 이상임을 확인할 수
있습니다. 하지만 이와 같은 방법을 이용하면 자신의 주민등록증에 적혀있는 주소와 같은 부가적인 정보도 드러날 수 있습니다.
이 때 영지식 증명을 이용하면 나머지 정보는 드러내지 않더라도 자신의 나이가 19세 이상이라는 증거 값만 드러내는 효과를
얻을 수 있습니다.

> 위 예시의 statement는 '나는 성인이다' or '나는 19세 이상이다'

일반적인 암호화, 복호화, Hash 함수 정도의 암호 지식을 가지고 있던 제게는 위와 같은 암호 알고리즘은 굉장히 놀라웠습니다.
또한 실제로 이와 같은 암호 알고리즘이 수학적으로 어떻게 가능한 지에 대해 궁금해져 영지식 증명에 대해 찾아보았습니다.
컴퓨터 공학과와 개발에서 배웠던 지식과는 다르게 암호 알고리즘은 기본적으로 수학적인 이론을 통해 증명됩니다. 물론 이 수학적 지식이
제가 고등학교때까지 배웠던 수학과는 많이 달랐습니다.

대표적인 것은 유한체라고 하는 유한 개의 원소를 가지는 집합입니다. 암호 알고리즘을 보다 보면 주로 $$\mathbb{Z}_p$$ 혹은
$$\mathbb{Z}_p^*$$와 같은 기호를 많이 보게 됩니다. 수학에서는 정수 범위를 무한대로 잡고 계산해도 문제가 없지만
컴퓨터 환경에서는 다릅니다. 하지만 임의로 정수 범위 1~10000 과 같이 지정하게 되면 수학 연산의 규칙이 깨질 수 있습니다.

이런 점을 해결하기 위해 위의 유한체를 사용합니다. 0보다 큰 정수를 소수인 정수 `p`의 mod(나머지) 연산을 하게 되면
그 값은 곱셈에 대해 닫힌 집합을 갖게 됩니다. 또한 덧셈, 뺄셈, 곱셈, 나눗셈의 사칙연산이 가능해집니다. 

$$
if a = 3, b = 2, p = 7 \\ 
a \div b = a \times b^{-1} = a \times 4
$$  

예를 들면 나눗셈은 곱셈의 역원(곱했을 때 1이 되게 하는 값)을 찾아 곱하여 처리합니다. 위에서 보이는 예시와 같이
b라는 값으로 나누고 싶은 경우 b의 역수(2의 역수)인 4를 곱해 나누기 연산을 처리할 수 있습니다.

이렇듯 암호에서는 고등학교때까지 배웠던 수학과는 다른 방법으로 연산을 처리하게 됩니다.

### Prover, Verifier

영지식 증명의 수학적인 증명을 알아보기 전에 먼저 알고 있어야 할 사전지식이 있습니다.

먼저 영지식 증명은 공개키 암호화처럼 암호 알고리즘을 적용하는 대상과 검증하는 대상이 다릅니다. 사실 상식적으로 생각했을 때
자신의 비밀 값을 숨긴 채로 비밀 값이 특정 조건을 만족하는지 확인하는 암호 알고리즘이므로 대상이 다른 게 당연합니다.

영지식 증명에서는 자신의 값을 드러내지 않은 채 값을 가지고 있음을 증명하는 Prover $$P$$, Prover의 비밀 값 없이도 
Prover가 값을 가지고 있는 지 확인하는 Verifier $$V$$로 구성하여 각각의 수학적 알고리즘을 적용합니다.

### Assumption

영지식 증명 암호 알고리즘을 위해서는 암호 알고리즘의 수학적인 가정인 `Assumption`이 필요합니다. 예를 들어 
어떠한 수 `g`의 n-제곱은 구하기 쉽지만 역인 $$\log_g{g^n}$$를 구하기는 어렵습니다. 이렇게 어떤 값(n)을 알고 있다면 
값을 계산하기 쉽지만 계산된 값($$g^n$$)을 통해서는 기존의 값을 구하기 어렵다는 수학적 문제(discrete logarithm)가
참이라는 가정을 통해 영지식 증명을 구현할 수 있습니다. 이렇게 가정이 되는 수학적 문제가 풀기 어려울 수록 강한 암호 알고리즘이
됩니다. 위에서 설명한 [이산 로그 문제(discrete logarithm)][discrete-logarithm]는 풀기 어려운 문제로
실제로 RSA, Elgamal, DH 키 교환과 같은 암호 알고리즘에서도 사용됩니다.

> Discrete logarithm relation Assumption
>
> 이산대수 가정 (이산로그의 효율적 알고리즘이 존재하지 않지만 거듭제곱은 간단히 계산 가능)

### Sigma Protocol

영지식 증명을 적용할 때 [Sigma protocol][sigma protocol]을 이용할 수 있습니다. Sigma protocol이란 `Commitment`, `Challenge`,
`Response`의 세 단계로 Prover와 Verifier의 값을 주고 받는 과정을 나눕니다. sequence diagram으로 보면 다음과
같습니다.

``` mermaid
sequenceDiagram
Prover->>Verifier: Commitment
Verifier->>Prover: Challenge
Prover->>Verifier: Response
```

#### Commitment

Prover는 자신의 비밀 값을 드러내지 않고 자신이 비밀 값이 어떠한 조건을 만족하는 지 증명해야 합니다. 자신의 값을
드러내지 않는 것은 단순히 암호화만 적용해도 쉽게 해결할 수 있습니다. 하지만 Prover는 Verifier가 자신이 값을
가지고 있음을 확신시켜야 합니다.

때문에 Prover는 자신의 비밀값을 이용해 자신이 이후 비밀값을 변경하지 못하도록 하는 증거 값을 내세워야 합니다.
그 값이 바로 commitment입니다. 예를 들어 Hash함수를 이용한 commitment가 가능합니다. 자신의 비밀 값이 만약
`26`이라면 이 값의 SHA256을 취한 값은 `5f9c4ab08cac745...`입니다.

Hash는 일방향 함수로 비밀 값의 Hash 값은 구하기 쉽지만 이를 역으로 계산하는 것은 어렵습니다. 또한 비밀 값이 1 bit라도
변경된다면 Hash값은 달라집니다. 때문에 비밀 값을 Hash를 취한 값을 공개한 후 자신의 값에 대한 Challenge를 받고
response를 하면 자신의 비밀 값을 변경하고 싶더라도 commitment 값을 만족시킬 수 없기 때문에 자신의 비밀 값을
변경할 수 없습니다.

이번에는 위에서 언급했던 이산 로그 문제를 이용해 다시 한번 수식적으로 확인해보겠습니다.

##### 이산 로그 문제 예시

이산 로그 문제는 앞서 언급했듯이 n-제곱은 구하기 쉽지만 로그 값을 구하기 어려움을 이용한 방법으로 진행은 다음과 같습니다.

``` mermaid
sequenceDiagram
Note left of Prover: x = secret,<br/>v = random(),<br/>y = g^x (mod p),<br/>t = g^v (mod p)
Prover->>Verifier: y, t
Note right of Verifier: c = random()
Verifier->>Prover: c
Note left of Prover: r = v-cx
Prover->>Verifier: r
Note right of Verifier: check t == g^r*y^c 
```

Prover는 자신이 x라는 secret 값을 가지고 있음을 증명하고 싶을 때 x를 직접 보내는 것이 아닌 $$g^x$$값을 전송하여
자신의 값을 숨길 수 있습니다. 이 때 임의의 random 값인 v를 함께 보냅니다. 이 값이 Prover의 commitment입니다.
Verifier의 입장에서는 commitment만으로는 아무런 정보를 얻을 수 없습니다. 때문에 Prover가 정말 비밀값을 가지고
있는지 확인하기 위해 random 값인 c를 전송해 challenge를 보냅니다.

Prover는 Prover와 Verifier 모두 알고 있는 `c`와 자신만 알고 있는 `v`, `x`를 이용해 r 값을 계산합니다.
Verifier는 r 값을 통해 x를 알고 싶다 하더라도 v의 값과 x값에 대해 알지 못하기 때문에 x를 r을 통해 역으로 계산할 수는 없습니다.

하지만 $$t = g^ry^c$$라면 Prover가 비밀 값 `x`를 가지고 있음을 확인할 수 있습니다.

$$
t = g^v \\
r = v - cx \\
y = g^x \\
g^ry^c = g^{v-cx}(g^x)^c \\
= g^{v-cx}g^{cx} = g^v = t
$$

위의 식과 같이 commitment 값을 통해 response 값의 참 거짓을 확인할 수 있습니다.

$$
M_{pp} \times R_{pp} \rightarrow C_{pp}
$$

결국 commitment란 자신의 비밀값인 Message space $$M_{pp}$$와 Random space인 $$R_{pp}$$의 연산을 통해
Commitment space $$C_{pp}$$ 를 계산해내어 공개하는 방법으로 Prover는 비밀 값을 수정하지 못하게 하고
Verifier에게는 비밀 값을 공개하지 않더라도 값을 검증할 수 있게 하는 역할을 합니다.

> `pp`는 public parameter로 setup 단계에서 생성


### NIZK

위의 Sigma protocol은 대화형 영지식 증명(Interactive Zero-Knowledge proofs)입니다. 대화형 영지식 증명은
위에서 보는 것처럼 Prover와 Verifier의 값을 서로 주고 받으며 값을 검증합니다.

서버 환경에서 서로 통신을 주고 받는다면 이러한 IZK는 문제가 없습니다. 그렇기 때문에 Hyperledger에서는 `idemix`라는
DID 시스템에서 서버와의 통신을 사용하여 IZK를 사용합니다. 하지만 일반적인 블록체인 환경에서는 이야기가 조금 다릅니다.
예를 들어 이더리움 환경에서는 한 블록이 생성되기까지 15초가 블록이 확정되기까지 약 6분 정도가 소요된다고 합니다.
심지어 자신이 올린 트랜잭션은 언제 블록에 올라갈지도 예측하기 어렵습니다.

이런 환경에서 통신을 주고 받는다면 서로 주고받는 시간이 굉장히 길어질 수 있습니다. 또한 블록체인에 정보를 올리는 것은
비용이 높습니다. 때문에 블록체인 환경에서는 통신이 필요 없는 비대화형 영지식 증명(Non-Interactive Zero-Knowledge proofs)이
중요하게 여겨집니다.

기존 Sigma protocol에서는 `commitment`, `challenge`, `response`의 구조로 이루어져 있었습니다.
이 중 `commitment`와 `response`는 모두 Prover가 직접 생성해내는 값이고 `challenge`값만이 Verifier가
전송한 값입니다. challenge의 역할은 Prover가 자신의 값을 조작해내지 못하게 하는 것입니다. 때문에 challenge의
값은 Prover가 조작할 수 없는 값이어야 합니다.

그렇다면 만약 Prover가 직접 자신이 조작할 수 없는 challenge 값을 만들어낼 수 있다면 통신 없이도 영지식 증명을 이용할
수 있지 않을까요?

#### Fiat-Shamir heuristic

Fiat-Shamir heuristic은 Amos Fiat와 Adi Shamir에 의해 제안된 방법으로 IZK를 NIZK로 만드는 데 사용할 수 있습니다.
위에서 말한 이산 로그를 이용한 대화형 영지식 증명시스템을 Fiat Shamir heuristic을 적용하여 NIZK로 변경해보겠습니다.

``` mermaid
sequenceDiagram
Note left of Prover: x = secret,<br/>v = random(),<br/>y = g^x (mod p),<br/>t = g^v (mod p),<br/>c = H(g, y, t),<br/>r = v-cx
Prover->>Verifier: y, t, r
Note right of Verifier: check t == g^r*y^c
```

Fiat-Shamir heuristic을 적용하게 되면 더이상 Prover와 Verifier가 상호작용할 필요 없이 Prover가 모든 처리를 한 후
Verifier에게 값을 전송할 수 있습니다. Verifier가 random한 값을 선택해 challenge를 하던 작업을
Prover가 직접 `g`, `y`, `t`의 값을 이용하여 Hash 함수를 적용하여 c 값을 생성합니다.

Hash 함수는 어떤 결과값이 나올 지 예측할 수 없고 입력 값을 통해 조작할 수 없으므로 Prover가 `c`의 값을 임의로
생성할 수 없습니다. 이와 같은 방법으로 Prover가 임의로 생성할 수 없는 random한 값을 이용해 IZK를 NIZK로 확장할
수 있습니다.

### Implementation

영지식 증명을 적용하게 되면 자신의 비밀 값을 공개하지 않고 작업을 증명할 수 있지만 다른 암호 알고리즘과 마찬가지로
오버헤드가 발생하게 됩니다. 또한 영지식 증명 암호 알고리즘에 대해 특별한 표준이 존재하지 않기 때문에 다양한 영지식 증명
구현이 제안되었습니다. 

영지식 증명에 대해 어느정도 보았던 사람들이라면 보았을 zk-SNARKs, [Bulletproofs][Bulletproofs-paper], zk-STARK 등 다양한
implementation이 제안되었다. 다양한 영지식 증명 구현이 제안된 것은 아직 영지식 증명이 성능적인 이슈와 
보안 이슈가 남아있기 때문입니다. 

NIZK에서는 Prover가 Verifier에게 전송하는 값 $$\mathsf{Proof} \pi$$의 크기,
Prover가 $$\mathsf{Proof} \pi$$를 생성하는 시간 `Proving time`, Verifier가 $$\mathsf{Proof} \pi$$를
검증하는 시간 `Verification time`의 값을 통해 성능을 측정합니다. 현재까지 제안된 알고리즘들은 마치 블록체인 트릴레마처럼
일부 성능을 개선시키면 다른 두가지 값의 성능이 떨어지는 등 성능 이슈가 남아있습니다.

그 중에서도 zk-SNARK는 zero-knowledge Succinct Non-ARgument of Knowledge의 약자로 뒤에 zk-SNARKs에
s가 붙은 것은 복수에 붙는 s로 추정됩니다. 실제로 용어에서 알 수 있듯이 Non-Interactive하고 proof의 크기가
간결한(succinct) 영지식 증명입니다. 대부분의 블로그 글들에서 설명하던 zk-SNARK는 [pinocchio][pinocchio]
구현에 대한 것 같았습니다.

pinocchio는 R1CS(Rank 1 Constraint System)과 QAP(Quadratic Arithmetic Programs)이라는 방법을
이용하여 statement를 수학적인 circuit으로 생성하고 이에 대해 영지식 증명을 적용합니다. R1CS와 QAP을 이용하는
SNARK에 대한 설명은 길어질 수 있으므로 이후 포스팅하겠습니다. SNARK은 Verification time과 Proof size면에서는
$$O(1)$$의 복잡도를 가지기 때문에 두 면에서는 성능적으로 뛰어납니다. 하지만 proving time은 $$O(ClogC)$$로
proof을 만드는 시간은 어느정도 소요됩니다.

하지만 SNARK에서 문제가 되는 것은 위의 성능이 아닙니다. 

#### Setup

SNARK에서 문제가 되는 부분은 성능 이슈가 아닌 Trusted Setup입니다. SNARK에서는 CRS(Common Reference String)라고
불리는 랜덤한 값에 의존합니다. 이 값은 초기에 주어져야 하는 값인데 이 값은 prover가 임의로 지정하면 자신이 실제로
값을 가지고 있지 않더라도 검증 결과로 참을 얻을 수 있는 Fake proof을 생성할 수 있습니다.

때문에 성능적인 이득은 있지만 금액이 걸린 거래 시스템이나 신뢰가 필요한 시스템에서는 이용하기 어렵습니다. ZCash에서는
이러한 문제를 해결하기 위해 MPC(Multi-Party Computation)을 이용해 CRS를 생성해 단 1명의 honest user만 있다면
시스템에 문제가 없게 만듭니다.

결국 zk-SNARK에서는 Trusted Setup 문제를 해결하기 위해서 추가적인 비용이 들어가거나 Fake proof 문제를
안고 가야 합니다.

하지만 Bulletproofs와 zk-STARK와 같은 암호 알고리즘은 Trusted Setup이 필요없습니다. zk-SNARK에서는 
성능 개선을 위해 random한 값을 이용하여 성능을 개선했는데 타 알고리즘에서는 위와 같은 random 값에 의존하지 않아
Setup 단계에서 신뢰가 필요하지 않습니다.

##### 정리하며..

영지식 증명 암호 알고리즘은 아직 더 개선될 여지가 많은 알고리즘 같습니다. 뿐만 아니라 프라이버시가 중요하게 여겨지는
최근 상황들을 볼 때 실제로 사용될 분야도 많아보입니다.

하지만 아직 다른 공개키, 대칭키, Hash와 같은 암호 알고리즘처럼 쉽게 적용하기 어렵다보니 갈 길이 멀어보입니다.
이후 다른 알고리즘처럼 쉽게 사용할 수 있는 프레임워크나 라이브러리가 나오기를 기대합니다.    

[discrete-logarithm]: https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%82%B0_%EB%A1%9C%EA%B7%B8
[sigma protocol]: https://www.cs.au.dk/~ivan/Sigma.pdf
[pinocchio]: https://eprint.iacr.org/2013/279.pdf
[Bulletproofs-paper]: https://eprint.iacr.org/2017/1066.pdf
