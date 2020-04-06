
#### Setup

#### Commitment



## Assumption
PPT에서 security parameter $$\lambda$$ 값을 가지고 계산
$$\lambda$$를 제거한 후 계산하게 하여 악의적인 유저는 계산 불가능

## Commitments
Non-interactive commitment scheme은  pair of probabilistic polynomial time algorithms으로 구성된다
// Setup, Commitment

public parameter `pp`를 $$Setup(1^{\lambda})$$으로 security param을 통해 생성

### Commitment란?
$$M_{pp} \times R_{pp} \rightarrow C_{pp} $$
Message space인 $$M_{pp}$$와 Random space인 $$R_{pp}$$의 연산을 통해
Commitment space $$C_{pp}$$ 를 계산함

#### Homomorphic Commitments
`abelian group`을 사용
교환법칙이 성립

$$
Com(x_1;r_1) + Com(x_2; r_2) = Com(x_1 + x_2; r_1 + r_2)
$$

=> 메시지와 메시지와의 연산, Random과 Random과의 연산이 가능하다는 의미인듯?

#### Hadamard product


$$  
\Pi^n_{i=1} g_i^{a_i} = 1
$$

> Discrete logarithm relation Assumption
> 이산대수 가정 (이산로그의 효율적 알고리즘이 존재하지 않지만 거듭제곱은 간단히 계산 가능)
> Elgamal, RSA, DH key exchange 등에서 

> PPT: Probabilistic Polynomial Time algorithm
> 다항식 시간에 확률적으로 풀 수 있는 알고리즘?

> Negligible function: 무시할 수 있는 함수? 그정도로 작다.
> https://en.wikipedia.org/wiki/Negligible_function

[sigma protocol]: https://www.cs.au.dk/~ivan/Sigma.pdf
[discrete-logarithm]: https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%82%B0_%EB%A1%9C%EA%B7%B8
[abelian group]: https://ko.wikipedia.org/wiki/%EC%95%84%EB%B2%A8_%EA%B5%B0
[Hadamard product]: https://ko.wikipedia.org/wiki/%EC%95%84%EB%8B%A4%EB%A7%88%EB%A5%B4_%EA%B3%B1
[Bulletproofs-paper]: https://eprint.iacr.org/2017/1066.pdf
[Negligible function]: https://en.wikipedia.org/wiki/Negligible_function