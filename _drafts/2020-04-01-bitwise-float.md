---
layout: post
title:  "비트부터 구현해보자 - 2 (float)"
date:   2020-04-01 12:35:00 +0900
categories: [Computer Science]
author: 김혁진
tags: [base, Bitwise, float]
---

지난번에는 Integer를 Bit단위부터 구현해보았습니다. Integer는 우리가 알고 있는 이진수에 sign 비트를 통한 부호 표현을
합니다. 하지만 Float는 Integer와는 값을 표현하는 방법이 다릅니다. 


##### reference

> [https://www.sciencedirect.com/topics/computer-science/fractional-bit](https://www.sciencedirect.com/topics/computer-science/fractional-bit)
>
> [https://www.h-schmidt.net/FloatConverter/IEEE754.html][IEEE754]
>
> [https://github.com/HyeockJinKim/Study-CS][github]

[bias]: https://en.wikipedia.org/wiki/Exponent_bias
[IEEE754]: https://www.h-schmidt.net/FloatConverter/IEEE754.html
[github]: https://github.com/HyeockJinKim/Study-CS
