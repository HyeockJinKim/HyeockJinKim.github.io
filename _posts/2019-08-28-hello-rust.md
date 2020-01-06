---
layout: post
title:  "Hello Rust"
date:   2019-08-28 23:30:00 +0900
categories: [Rust]
author: 김혁진
tags: [Rust]
---

`Rust`는 `Mozila`에서 만든 언어로 `C`, `C++`과 거의 비슷한 속도를 가지고 있지만 메모리 관리가 더 쉬워 속도가 중요한 프로젝트들에서 자주 사용되는 것을 볼 수 있습니다.
`C`와 `C++`에서 메모리 관련 오류가 발생할 경우 `RunTime`에 오류를 알아내지만 Rust는  이를 `CompileTime`에 잡아낼 수 있습니다.  방법은 `C++`에서의 스마트포인터 방법과 비슷합니다.

`C++`에서 `unique_ptr`, `shared_ptr` 등의 스마트 포인터를 이용해서 메모리를 관리할 수 있습니다.  예를 들어 `C++`에서는 아래와 같은 코드를 작성할 수 있습니다.
```cpp
#include <iostream>
#include <memory>

using namespace std;
int main(int argc, const char * argv[]) {
  shared_ptr<int> ptr(new int(5));  // 참조 카운트 : 1 개 cout << ptr.use_count() << endl;  // 참조 카운트 출력  1     {
  shared_ptr<int> ptr2 = ptr;  // 참조 카운트 : 2 개 cout << ptr2.use_count() << endl;  // 참조 카운트 출력  2 }  // Scope 종료 -> 참조카운트 감소     cout << ptr.use_count() << endl;  // 참조 카운트 출력  1
  return 0;
}
```
> 실행 결과
```bash
1
2
1
Program ended with exit code: 0
```
`unique_ptr`, `shared_ptr`과 같은 스마트포인터를 이용하면 포인터가 불리는 reference 개수를 저장해두고 reference가 0이 될 때
`free`시켜주게 되어 더이상 사용되지 않는 값이 메모리에 남아있는 상황을 막아줍니다.

이런 reference 방식을 이용해 `Rust`는 모든 객체가 `unique_ptr`, `shared_ptr`을 이용하는 것처럼 reference를 계산하여 메모리가 더이상 사용되지 않음을 확인하여 메모리를 관리합니다.

메모리 관리에서 재미있는 점은 변수의 `Mutability`와 `Ownership`입니다. `Mutability`는 변수의 값을 변경하는 것이 기본적으로 불가능 한것을 의미하고 `Ownership`은 객체를 사용할 때에 변수를 넘겨주면 소유권도 넘겨주게 되어 더이상 기존의 변수로 접근이 불가능하게 만드는 개념입니다.

예를 들어
```rust
fn main() {
    let a = String::from("ABC");
    let b = a;  // Ownership 이 a변수에서 b변수로 넘어감
    println!("{}", a); // 접근 불가능
}
```
rust에서는  위와 같은 경우 a변수에서 b변수로 접근할 수 있는 Ownership이 넘어가게 되어 더이상 a에서 접근할 수가 없습니다.

rust는 Java, Python, C++ 과 같은 기존에 많이 사용되던 언어보다 변수를 다루는 데에 굉장히 엄격한 언어입니다. 그러나 이런 엄격함을 통해 안전하게 메모리를 관리할 수 있게 합니다. 앞으로 rust 언어를 사용하는 방법에 대해서 공부해보겠습니다.

> Reference
> https://doc.rust-lang.org/book/title-page.html

[rust_page]: https://doc.rust-lang.org/book/title-page.html