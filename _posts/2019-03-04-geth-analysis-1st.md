---
layout: post
title:  "Go-Ethereum 분석기 - 1번째"
date:   2019-03-04 19:42:50 +0900
categories: [Geth]
tags: [Ethereum, go]
---

Go-Ethereum은 Go 언어로 만들어진 Ethereum protocol을 다루는 프로그램으로 Geth라고 줄여서 부르기도 합니다.
Go 언어 외에도 python 언어로 만들어진 [pyethereum][pyethereum], Java 언어로 만들어진 [ethereumj][ethereumj],
C++로 만들어진 [aleth][aleth]도 있습니다. 하지만 이 중 가장 많은 Star를 받고 주목받고 있는 것은
Go 언어로 만들어진 [go-ethereum][go-ethereum]입니다.

아무래도 Go 언어가 goroutine과 Channel을 사용하여 멀티 스레드 상황에서 쉽게 개발할 수 있고 코드를 쉽게 이해할 수
있다 보니 Go를 이용한 Geth가 큰 매력을 느끼지 않았을까 싶습니다. Geth의 코드를 분석하다 보니
컨테이너 역할을 하기위해 만들어진 Docker가 Go 언어로 작성된 이유를 어느정도 알 것 같습니다.

### Private Network

Geth는 command를 입력하거나 console 명령어를 통해 Javascript console에서 입력을 하여
Geth를 통한 Ethereum 조작이 가능합니다. 물론 실제 메인 네트워크에서는 가지고 있는 이더도 얼마 없고 직접 채굴하기에도
다른 사람들의 막강한 해쉬파워를 뚫지 못해 많은 작업은 하기 어려울 것입니다. 만약 돈이 많아 이더리움 Ether를 사서
메인 네트워크를 바로 다룬다면야...

하지만 매번 Geth를 통해 작업을 할 때마다 이더리움 메인 네트워크의 막대한 금액을 부담하고 테스트를 할 수는 없습니다. 그런 사람들을 위해
Ropsten, Rinkeby와 같은 여러 테스트넷이 있습니다. Ropsten은 Ether가 부족한 사람들에게 무료로 Ether를 공급합니다. 약 10 Ether까지!
(이 네트워크는 무료로 이더를 줍니다)
심지어 사용하고 나면 다시 공급해주기 때문에 꽤나 매력적인 네트워크입니다. 게다가 실제 메인네트워크에 집중된 사람보다
테스트넷에 몰린 사람이 더 적고, 난이도도 메인네트워크에 비해 낮아 블록도 빠르게 생성되고 빠르게 반영되는 것을 볼 수 있습니다.
물론 테스트 네트워크의 Ether는 가치가 없긴 하지만 그래도 직접 만든 Contract를 테스트하기에는 좋은 네트워크인 것은
분명합니다.

![main_net_difficulty](/files/testnet_mainnet_difficulty.png)
###### Test Net(Default, Rinkeby)의 Difficulty가 Main network보다 난이도가 낮다.

하지만 이마저도 실제로 테스트해보기에는 몇 가지 제한이 있습니다. 만약 합의 알고리즘을 새로 만들어서 새로운 네트워크에
적용시켜보고 싶다면? 내가 사용하려는 방법에 맞게 커스터마이징된 네트워크를 만들고 싶다면? 테스트넷만으로는 어려움이 있습니다.
그런 사람을 위한 네트워크가 Private Network입니다. private network는 임의의 Genesis Block을 만들어 블록 설정을
하고 임의의 네트워크를 만들어낼 수 있습니다. 이 네트워크에서는 우리는 매우 낮은 난이도를 통해 채굴도 마음껏 할 수 있고
(심지어 경쟁자도 없어 무한채굴이 가능합니다)
Ether도 마음껏 사용할 수 있습니다. (채굴로 벌어들인 Ether를 사용하거나 혹은 미리 계좌에 ether를 넣어둘 수도 있습니다)
실제로 DApp을 만들 때에도 먼저 Private Network를 구축하여 자신의 네트워크에서 테스트 해보고
비교적 메인 네트워크와 비슷한 환경인 테스트넷에서 테스트를 한다고 합니다. 여기까지 문제가 없었다면 마지막으로
메인 네트워크에 DApp을 올려 Dapp을 배포한다고 합니다.

물론 Private Network는 다른 네트워크와 다르게 합의 알고리즘의 변경, 블록 구조의 변경, 혹은
트랜잭션의 변경과 같은 블록체인의 구조 변경을 직접 할 수 있습니다.
테스트 넷이 Contract를 메인 네트워크와 비슷한 환경에서 테스트 해보는 네트워크라면 private network는
네트워크 구성조차 내 마음대로 조작할 수 있는 진짜 나만의 네트워크입니다.
그럼 한번 private network를 구축해봅시다.

#### Genesis Block

Genesis Block은 Network의 첫 블록으로 블록체인 네트워크의 설정을 가지고 있는 블록입니다.
블록체인의 네트워크를 만들기 위해 Genesis Block은 없어선 안될 블록입니다. 블록체인의 설정의 역할,
블록체인의 다음 블록을 쌓기 위한 첫 블록의 역할을 하게 되는데 어느 것 하나 빠질 수 없는 역할입니다.
또, 만약 다른 사람과 같은 네트워크를 연결하고 싶다면 같은 Genesis Block을 가지고 있어야만 합니다.
그렇지 않다면 같은 블록체인을 공유할 수 없습니다.

**그렇다면 Main Network와 Test Network는 Genesis Block을 어떻게 공유하고 있을까요?**

![main_net_config](/files/mainnet_config.png)
###### 각 네트워크의 설정도 Genesis Block과 함께 Geth 내에 하드코딩 되어있다.

기본적으로 위와 같이 Main 네트워크와 Test 네트워크는 Geth에 하드코딩 되어있습니다.
위의 이미지들에서 볼 수 있듯이 메인 네트워크 혹은 테스트 네트워크의 Genesis Block은 Geth
내에 고정되어 있고 geth를 사용하는 유저들이 모두 같은 Genesis Block을 가지고 있어 같은 네트워크에 참여할 수 있습니다.
하지만 내가 만들어낸 private network에 대해서 다른 사람이 참여하게 하고 싶다면 내 Genesis Block을
공유해야 합니다.

**private network를 구축하기 위해서 Genesis Block에는 어떤 값이 들어가야 할까요?**

![genesis_block](/files/genesis_block.png)
###### geth내의 Genesis Block struct

Genesis Block에 들어갈 수 있는 값들은 위와 같습니다. 하지만 모든 값들이 Genesis Block에 반드시 들어가야 하는 것은 아닙니다.
Genesis Block에 반드시 들어가야 하는 필수적인 값은 다음과 같습니다.

* config
* difficulty
* gasLimit
* alloc

위의 4가지 값이 Genesis Block에서 빠지면 안되는 값입니다. config는 위의 코드에서 다른 세 값과 달리 required가
붙어있지 않지만 Genesis Block에 config 값을 넣지 않으면 블록체인이 생성되지 않습니다.

##### Genesis Block의 필수 요소

* `config`
    - config는 블록체인의 여러 설정을 담는 값입니다. 기본적으로 dictionary형태로 저장되며
    `chainId`, `homesteadBlock`, `epi155Block` 등의 값이 들어갑니다. config는 들어가는 값이
     꽤 많기 때문에 이에 대해서는 뒤에서 설명하겠습니다.
* `difficulty`
    - difficulty는 블록을 생성할 때의 난이도에 관련된 값입니다. 블록체인에서 블록을
     POW방식으로 생성할 때에 블록의 해쉬 값이 2^256/difficulty보다
     작은 경우에만 블록이 생성해 Nonce를 바꾸며 블록을 생성해야 하는데 difficulty가 작으면 작을 수록
     그 가능성이 높아지므로 블록이 빠르게 생성됩니다.
    - 물론 difficulty가 높을 수록 다른 사람이 블록을 빠르게 쌓아 다른 블록이 가장 긴 블록이 되게 하기는 어렵겠지만
    블록 생성 시간이 느려지게 됩니다.
    - difficulty가 낮으면 블록 생성 시간은 빨라지지만
    악의적인 사용자가 강한 해쉬파워를 이용해 빠르게 블록을 생성해 낼 가능성이 높아진다는 보안적인 단점이 있습니다.
* `gasLimit`
    - 블록의 가스 제한입니다. 이더리움에서는 DoS를 막기 위하여 어떤 작업을 하기 위해서는 Gas가 소모됩니다.
    만약 가스 제한이 넘치는 작업이라면 그 작업은 선택되지 못하게 됩니다. 각 Transaction도 가스 제한이 있고
    Transaction을 담는 블록에도 최대 가스 제한이 있는 것입니다.
* `alloc`
    - ether를 미리 계좌에 넣을 수 있습니다. Ether(balance)를 미리 계좌에 넣는 기능 외에도
    다른 값을 미리 할당할 수도 있는 것 같습니다. 하지만 구글링을 해봤을 때에 주로 alloc은 계좌에
    돈을 미리 pre-fund 하는 기능으로 쓰이는 것 같습니다.
![alloc_img](/files/alloc_code.png)
###### balance의 할당 외에도 다른 값도 미리 할당 가능하다.

이외에도..

* Nonce
* TimeStamp
* ExtraData
* MixHash
* Coinbase
* Number
* GasUsed
* ParentHash

위의 값들이 있지만 이 값들은 블록체인의 설정에 위에서 설명한 4가지 값들에 비해 큰 영향을 주지 않는 값들입니다. 그 중 하나를 보자면
Nonce의 경우에는 블록을 생성할 때에 임의로 변경해가며 블록의 Hash값을 일정 값보다 작아지게 만들기
위해 사용되는데 Genesis Block의 경우에는 전혀 영향을 주지 않습니다.

이제 잠시 넘어갔던 config에 대해 알아봅시다. config는 간단하게 말하면 블록체인의 설정을 위한 값이라고 할 수 있습니다.

![config_img](/files/block_config.png)
###### config에 들어가는 값들

##### config의 요소

* `chainId`
    - replay attack을 막기 위한 요소로 사용됩니다. 이더리움이 하드포크 되면서 같은 이더리움이었지만
    다른 네트워크를 동시에 유지해나가면서 블록의 구분은 되지만 Transaction은 각기 다른 네트워크에 구분없이 Transaction pool에
    들어갈 수 있었기 때문에 Transaction의 서명을 `chainId`에 따라 다르게 하여 Transaction을 구분하였습니다.
* `HomeSteadBlock`
    - 이더리움의 로드맵은 크게 4단계가 있습니다. 0단계 올림픽, 1단계 프론티어, 2단계 홈스테드, 3단계 메트로폴리스, 4단 세레니티.
    이러한 로드맵을 따라 진행되고 있는데 이 때에 로드맵이 적용된 블록의 number를 HomeSteadBlock에 지정합니다.
    - 0으로 지정할 시 모든 블록에 HomeStead가 적용됩니다.
    - nil으로 지정할 경우 HomeStead Fork가 적용되지 않은 이더리움 설정으로 적용됩니다.
* `DAOForkBlock`
    - HomeSteadBlock과 마찬가지로 하드포크가 일어난 블록의 number를 받습니다. 다른 블록넘버를 받는 모든 값은 동일하게 적용됩니다.
* `Ethash`
    - 이더리움의 합의 알고리즘으로 현재 POW가 사용되고 있는데 Ethash가 바로 POW방식 합의 알고리즘을 담은 패키지이다.
    이더리움의 합의 알고리즘이 POW으로 설정된다.
* `clique`
    - 이더리움의 합의 알고리즘을 POA로 변경해준다. 대신 period와 epoch를 입력해야한다.

config에는 위와 같이 하드포크와 함께 이루어진 큰 변경들을 나의 블록체인에 적용할지, 혹은 언제 적용할지에 대한 정보를 적게 됩니다.

**이제 Genesis Block에 대해서 알아보았으니 Genesis Block의 값들을 설정하여 Block Chain의 private network를 구축해봅시다.**

```json
{
  "config": {
        "chainId": 0,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
  "alloc"      : {},
  "coinbase"   : "0x0000000000000000000000000000000000000000",
  "difficulty" : "0x20000",
  "extraData"  : "",
  "gasLimit"   : "0x2fefd8",
  "nonce"      : "0x0000000000000042",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00"
}
```

위의 예시는 [Go-ethereum][go-ethereum]의 README에 적혀있는 Genesis Block의 설정입니다.
사용할 필요가 없는 값들도 있고 빠른 블록 생성에는 적절하지 않을 수 있으니 아래와 같은 Genesis Block을 생성해봅시다.

```json
{
  "config": {
        "chainId": 97,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
  "alloc"      : {},
  "difficulty" : "0x1",
  "gasLimit"   : "8000029"
}
```

위의 예시와 같이 Genesis Block은 현재의 gasLimit인 8,000,029로 설정하고 빠른 채굴을 위하여
난이도를 1로 설정하였습니다. 이제 이 Genesis Block을 통해 Private Network를 구축해봅시다.

```bash
vi CustomGenesisBlock.json // Genesis Block 설정
mkdir .private_network     // private network를 위한 data directory
geth --datadir .private_network init CustomGenesisBlock.json
geth --datadir .private_network console // 혹은 다른 geth 명령어
// 만약 실제로 사용하려면 networkID도 설정해야한다.
```

위의 명령어를 통해 CustomGenesisBlock.json 파일에 Genesis Block을 설정하고
블록체인을 쌓을 data directory를 만들고 저장할 폴더로 설정합니다.
`geth init`을 이용하면 블록체인의 정보가 data directory에 저장되어 블록체인의 기능을 할 준비가 완료됩니다.
사실 init을 한 것만으로 이미 블록체인이 생성된 것으로 볼 수 있지만 블록체인의 기능을 다루려면 다른
geth 명령어를 사용해 블록을 채굴하거나 계좌를 만들거나 할 수 있고 혹은 여러가지 작업을 하기에는 console을 통해
 이더리움을 다루기 편하므로 `geth console`명령어를 통해 다룰 수 있습니다.

또한 같은 블록체인을 연결하기 위해 사용하는 Network Id는 네트워크가 같은 지 확인하기 위한 id로 연결하려는 peer들끼리
서로 같은 networkId를 사용하면 연결이 가능해집니다.

### 이후

여기까지 private network 구축이었습니다. 다음 포스팅에서는 private network에서 블록에 새로운
헤더 값을 넣어본다던지, 트랜잭션을 변경해본다던지 하는 geth 코드를 직접 변경하는 작업을 진행해보겠습니다.

##### Reference
>
> https://github.com/ethereum/go-ethereum
>
> https://ethereum.stackexchange.com/questions/37533/what-is-a-chainid-in-ethereum-how-is-it-different-than-networkid-and-how-is-it
>

[go-ethereum]: https://github.com/ethereum/go-ethereum
[pyethereum]: https://github.com/ethereum/pyethereum
[ethereumj]: https://github.com/ethereum/ethereumj
[aleth]: https://github.com/ethereum/aleth
