---
layout: post
title:  "비트부터 구현해보자 - 1 (integer)"
date:   2020-03-30 12:35:00 +0900
categories: [Computer Science]
author: 김혁진
tags: [base, Bitwise]
---

페이스북의 생활코딩 그룹에서 `float` 타입과 관련된 게시물을 보게 되었습니다. `float` 타입의 부동 소수점으로 인한
값의 오차에 대한 글이었던 것으로 기억합니다. 그동안 `float`와 부동소수점에 관련된 글을 간간히 본 적이 있어
이 주제를 명확히 알 수 있도록 포스팅을 하면 좋을 것 같다고 생각했습니다.

제 경우에는 무언가 공부할 때 글을 읽고 이해하는 것보다 직접 구현해보면서 공부하면 더 기억이 오래 남았습니다. 그래서 한번 `float`을
Bit 단위에서부터 구현하는 포스팅을 해보고자 했습니다. 물론 실제로 Bit 단위로 구현하게 되면 코드를 보고 내용을
이해하기 어려울 것 같아 `python`의 클래스와 연산자 오버로딩을 이용했습니다. `c++`으로도 연산자 오버로딩이 가능했겠지만 파이썬이 구현이 더 간편한
것 같아 파이썬으로 진행하였습니다.

### Bit (Binary Digit)
 
Bit는 `Binary Digit`의 줄임말으로 0 또는 1의 정보를 가지고 있습니다. 저도 이번에 찾아보면서 Bit가 Binary Digit라는 것을 알게 되었습니다.
단 하나의 bit는 0과 1, 두 값만을 표현할 수 있지만 이 bit가 n개가 모인다면 2^n의 값을 표현할 수 있습니다.
또한 Bit는 `&`, `|`, `^`, `~`의 Bit 단위의 연산을 할 수 있어야합니다. 

즉 Bit는 0, 1의 정보를 저장하고 `&`, `|`, `^`, `~`의 Bit 연산을 할 수 있는 class라고 생각할 수 있습니다.
그럼 한번 `Bit` class를 정의해줍시다.

<script src="https://gist.github.com/HyeockJinKim/c27b0907d4c9029bccf65fbaadbcb40a.js"></script>

###### Binary 정보를 저장하고 Bit 연산을 지원하기 위한 Bit Class

Bit는 0 또는 1의 정보를 표현하기 때문에 내부에 저장하기 위한 값으로 파이썬에서 지원하는 bool 타입을 이용합니다. 또한 xor, or, and 연산에 대해
operator overloading을 이용해 내부의 val 값의 연산으로 만듭니다. 이제 Integer나 Float의 기본이 되는 Bit 값을 다룰 수 있게 되었습니다.
물론 클래스로 만들어낸 가상의 Bit이다 보니 실제 1 Bit보다는 크기가 클 수 있지만 Bit의 기능을 그대로 할 수 있습니다.

```python
>>> from sys import getsizeof
>>> getsizeof(Bit())
64
```
###### 64 byte 크기의 Bit를 얻었다..

> [Bit의 구현][bit]을 자세히 보고 싶으시면 링크를 통해 깃헙 코드를 확인해주세요.

#### Bit 연산

Bit 단위의 연산은 가장 기본이 되는 하드웨어의 영역이라고 생각되어 Bit의 `&`, `|`, `^` 연산은 기존의 연산을 이용해 구현했습니다.
하지만 Integer, Float의 사칙연산은 Bit의 `&,` `|,` `^`, `~`의 비트 연산을 기반으로 구현합니다.

### Integer

정수인 Integer는 여러 비트의 집합입니다. 여러 비트를 모으면 큰 수를 표현할 수 있는데 이 때 int에서는 32bit 크기의 집합을 사용합니다.
하지만 우리의 최종 목표인 Float과 Integer는 구현이 크게 다릅니다. 정수는 정해진 범위의 값을 정확하게 표현할 수 있습니다. 
하지만 `float`값은 정해진 범위의 값이라고 하더라도 값이 분명하지 않습니다. 심지어 정의한 값과 다른 값을 가지고 있을 수도 있습니다.
그 이유를 알기 위해서는 Integer부터 알고 가야 할 것 같습니다.

<script src="https://gist.github.com/HyeockJinKim/75def44767f49ca03bceef30ed8ba0ff.js"></script>

###### Integer 값 저장과 기능을 위한 Integer 클래스

> [Integer 구현][integer] 전체 코드를 확인하시고 싶으신 분은 깃헙 주소를 확인해주세요.

```
+--------------+----------------------------------------------------------------------+
| sign (1 bit) |                            field (31 bit)                            |
+--------------+----------------------------------------------------------------------+
```

###### Integer의 메모리 구조

`integer`는 부호를 표현하기 위한 sign 비트 1비트와 정수의 크기를 표현하기 위한 31비트로 이루어져있습니다.
sign 비트가 1일 경우 음수, 0일 경우 양수로 판단 가능하며 +, - 연산은 부호가 음수일 때는 2의 보수로 변환하여 값을 연산합니다.
때문에 값을 읽을 때와 곱셈 나눗셈에서는 음수를 양수와 똑같이 읽고 계산할 수 있지만 덧셈과 나눗셈을 계산할 때에는 2의 보수로 변환해주어야 합니다.

결국 Integer는 field 값에 모든 비트가 0인 순간부터 모든 비트가 1인 순간까지 0에서 2^31-1 까지의 값을 표현할 수 있습니다. 여기에 sign 비트에 따라
양수 음수가 정해지므로 Integer의 범위는 -(2^31-1) ~ 2^31-1이 됩니다.

#### Integer 연산

정수 값의 연산은 Bitwise 연산인 `&`, `|`, `^`, `~`와 사칙연산인 `+`, `-`, `*`, `/` 등을 지원합니다. 먼저 비트단위 연산은 비트 연산의 batch
처리와 가깝습니다. 한 integer 값의 내부 32 bit들이 비트연산에서 서로에게 영향을 주지 않기 때문에 integer와 integer의 비트단위 연산은 비트들의
위치에 대응되는 비트와 연산하는 것으로 해결됩니다. 예시는 다음과 같습니다.

```python
def __xor__(self, other: "Integer") -> "Integer":
    """
    Bit XOR 연산( ^ )을 위한 operator overloading
    :param other: Integer 타입 가정
    :return: 새로운 Integer 객체로 return
    """
    field = [self.field[i] ^ other.field[i] for i in range(self.field_len)]
    sign = self.sign ^ other.sign
    return Integer(field, sign)
```

###### Integer의 xor 연산 (다른 비트 연산도 똑같이 적용됨)

xor 연산은 단순히 모든 대응되는 비트를 sign 비트부터 field의 비트들을 각각 xor 연산한 결과와 같습니다. or, and, ~ 연산도 마찬가지입니다.
하지만 사칙연산은 비트 단위 연산과 다릅니다. 사칙연산은 각 비트의 연산이 다른 비트에 영향을 줄수 있습니다. 예를 들어 `10 + 01` 의 경우에도 
하위 비트만 더했을 뿐이지만 상위비트에 영향을 주어 `100`이 됩니다. 이렇게 덧셈 연산은 대응되는 비트만이 아닌 상위 비트로 영향을 주게 됩니다.
그럼 정수의 사칙연산을 한번 확인해보겠습니다. 

##### Integer의 사칙 연산

먼저 `+` 덧셈 연산부터 확인해보겠습니다. `+` 연산은 `&`연산과 `^`연산, shift 연산의 비트 연산을 통해 구현할 수 있습니다.

```python
def __add__(self, other: "Integer") -> "Integer":
    if other.is_zero():
        return a, Bit()
    carry_0 = BitOperation.raw_and_bits(a, b)
    remain = BitOperation.raw_xor_bits(a, b)
    carry = BitOperation.raw_lshift_bits(carry_0, 1)

    res, overflow = Arithmetic.raw_add_bits(remain, carry)
    return res, overflow ^ carry_0[0]
```

###### Integer의 `+` 연산

a와 b라는 이진수를 더한다고 할 때 이진수의 덧셈에서는 a와 b에서 같은 비트의 값이 모두 1이면 상위 비트로 값이 전해지고 두 수 중 하나만 값이 1이면
값이 그대로 남아있습니다. 이 점을 이용해 `&` 연산과 `^` 연산, `<<` 연산을 이용해 덧셈을 표현할 수 있습니다.

```python
>>> 1 & 1
1
>>> 1 & 0
0
>>> 1 ^ 0
1
>>> 1 ^ 1
0
```

###### `&` 연산과 `^` 연산

`&` 연산을 하게 되면 대응되는 위치의 값이 모두 1일 경우에 1을 return 하므로 상위 비트로 전해질 값을 구할 수 있습니다. xor 연산은 두 값 중 하나만
1인 경우에만 1을 return 하기 때문에 `^` 연산으로는 현재 비트에 남은 값이 무엇일지 구할 수 있습니다. 또한 상위 비트로 전달은 `<<` 연산으로 가능합니다.
이 작업을 반복해 더이상 상위비트로 전해질 값이 없을 경우 (`&` 연산의 결과가 0 인 경우) 덧셈 연산이 끝나게 됩니다.

그렇다면 뺄셈 연산은 어떻게 처리해야 할까요?

뺄셈은 2의 보수를 이용합니다. 2의 보수를 통해 마이너스 값을 표현한 후 마이너스 값을 더하게 됩니다. 2의 보수는 이진수에서 덧셈의 역원이기 때문에
이 값을 더하게 된다면 뺄셈을 하는 것과 같은 효과가 발생합니다.

```python
def complement_bits(self) -> "Integer":
    invert = ~self
    return invert + Integer('1')
```

###### 2의 보수를 구하는 방법
```
0001  # 기본 값 1

1110  # invert 연산 ( ~ ) 
      # 0001과 더할 경우 1111
+  1  # 기존 값과 더했을 때 0을 만드는 값이 필요하기 때문에 1을 더함

1111  # 2의 보수 ( -1 )
```

2의 보수를 구하는 것은 쉽습니다. 모든 비트를 반대로 뒤집고 1을 더해주면 됩니다. 반대로 뒤집는 것은 비트 연산 중 `~` 연산을 이용하고 1의 크기를 가지는
Integer를 더하면 쉽게 2의 보수를 구할 수 있습니다. 값이 `0001` 이라고 할 때 `1110`으로 만든 후 기본 값과 더하면 `1111`이 됩니다. 여기서
`1`을 더하게 되면 `0000`이 되기 때문에 어떤 수의 덧셈에 대한 역원인 2의 보수는 모든 비트를 뒤집은 다음 1을 더하는 것입니다.

2의 보수는 비교적 쉽게 구했지만 아직 뺄셈에 문제가 남아있습니다.

```
덧셈 결과 음수
 0 0001  # 양수 ( 1 )
+1 1110  # 2의 보수 ( -2 )

1 1111  # 2의 보수 ( -1 )
1 0001  # sign 비트를 활용해 음수를 표현하고 값은 2의 보수를 되돌려 표현

# 덧셈 결과 양수
 0 0010  # 양수 ( 2 )
+1 1111  # 2의 보수 ( -1 )

0 0001  # overflow로 인해 sign 비트가 변경됨
```

Integer는 Sign 비트를 이용해 음수, 양수를 구분하기 때문에 연산 결과가 음수라면 다시 2의 보수를 되돌려서 기존의 값으로 만들어주어야 합니다.
예를 들어 1에서 2를 뺀다고 하면 2에 대해 2의 보수를 구하여 1과 더하면 됩니다. 하지만 이 경우 -1이 2의 보수 형태로 표현됩니다.
이 경우 어떻게 해결해야 할까요?

방법은 sign 비트를 이용하는 것입니다.

계산 결과의 sign 비트가 1이라면 그 값은 음수이므로 2의 보수를 되돌리는 작업을 합니다.
2의 보수는 ~ 연산 후 1을 더해 구했다면 반대로 1을 뺀 후 ~ 연산을 하는 것입니다. 1을 빼는 작업을 수행하면 무한 반복에 걸릴 수 있으므로
모든 비트가 1로 가득 채워진 Integer를 더하는 것으로 대신합니다.

이것이 가능한 이유는 덧셈 결과가 양수일 경우에는 overflow가 발생해 sign 비트의 값이 변경될 수 있기 때문입니다.

위의 방법으로 덧셈과 뺄셈을 해결했습니다. 이제는 곱셈과 나눗셈에 대해 확인해보겠습니다.

```python
def __mul__(self, other: "Integer") -> "Integer":
    res = Integer()
    for i, bit in enumerate(other.field[::-1]):
        if bit:
            mul2 = self << i
            res += mul2
    return res
```

###### Integer의 `*` 연산

```
     1111
*    1010
----------
     0000
    1111
   0000 
+ 1111  
----------
 10010110
```

곱셈은 로직은 간단합니다. 우리가 초등학교 때 곱셈을 배울 때 덧셈을 반복해가며 값을 더했던 것과 같습니다. 곱하는 값의 비트가 1인 경우에 해당 위치만큼
left-shift 하여 값을 더해주면 됩니다. `+` 연산을 기반으로 하지만 이제는 비트연산을 통해 `+`연산을 구현했으니 큰 문제가 없습니다.

그럼 마지막으로 나눗셈에 대해 알아보겠습니다.

```python
def __truediv__(self, other: "Integer") -> "Integer":
    if other.is_empty(b):
        raise ZeroDivisionError()

    remain = other
    res = Integer()
    one = Integer('1')

    for i in range(self.field_len - 1, -1, -1):
        div = b << i
        temp, overflow = remain - div
        if overflow:  # overflow가 발생했을 때에만 값이 양수임 ( 값을 빼도 값이 남아있음 )
            remain = temp
            res |= one << i

    return res
``` 

###### Integer의 `/` 연산

```
  1111
/ 0010
-------
- 0        -> 0000
  1111        ^
-------
- 10       -> 0100
  0111         ^
-------
-  10      -> 0110
  0011          ^
-------
-   10     -> 0111
  0001           ^
-------
           -> 0111
```

나눗셈은 뺄셈 또는 임시변수를 사용한 덧셈을 통해 구현 가능합니다. 나눗셈에서 0으로 나누는 작업은 integer에서는 zero division error를 발생시키기 때문에
처음에 확인해줍니다. 그 후 상위 비트부터 나누는 값을 shift 하여 그 값을 뺄 수 있는지 확인하는 작업을 반복합니다. 값을 뺄 수 있다면 그 값을 빼고 
shift한 위치의 비트를 결과에 `|` 연산을 통해 체크합니다. 이 작업을 모든 비트에 대해 수행하면 나눗셈을 구현할 수 있습니다.

지금까지 Integer에 대해 비트단위 연산과 사칙연산을 구현해보았습니다. Integer는 2진수를 배워서 그런지 걱정했던 것보다 쉽게 구현할 수 있었습니다.

포스팅을 하다보니 Integer에서 너무 길어져 Float 포스팅은 나누어 적어야 할 것 같습니다.
만약 구현한 코드를 모두 보고 싶다면 [github][github] 링크에서 확인할 수 있습니다.
현재는 덧셈, 나눗셈이나 비트연산이 Integer 만이 아닌 Float, Unsigned Integer 등에서 로직이 똑같이 사용되어 동일한 작업을 하는 함수는
nums 폴더에 분리시켜두었습니다.

[bit]: https://github.com/HyeockJinKim/Study-CS/blob/Float/bit/bit.py
[integer]: https://github.com/HyeockJinKim/Study-CS/blob/Float/integer/integer.py
[IEEE754]: https://www.h-schmidt.net/FloatConverter/IEEE754.html
[github]: https://github.com/HyeockJinKim/Study-CS