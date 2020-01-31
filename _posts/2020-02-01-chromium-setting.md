---
layout:     post
title:      "chromium 빌드"
date:       2020-02-01 01:00:00 +0900
categories: [Open source]
author:     김혁진
tags:       [Chromium]
---

재작년 2018년에 Contributhon이라는 오픈소스 대회를 참가한 적이 있습니다. 그 때 chromium/blink 팀에 참가하게 되었는데
그때는 큰 프로젝트를 다뤄본 적이 없어(물론 지금도 크로미움 만한 프로젝트는 다룬 적이 없지만..) 빌드하는 것도 버거워 빌드하는 방법들,
어떤 값들을 입력해야 하는지 모두 캡쳐하고 적어두며 따라해보았던 기억이 납니다. 프로젝트에서 코드 수정을 하다가 git을 잘못 건드려서 어떻게 할지 몰라
프로젝트 전체를 지우고 다시 받아와 빌드한 경험, 프로젝트에서 비슷한 이름의 브렌치를 만들어 작업하다가 실수로 작업중이던 브렌치를 지워버린 경험 등
개발은 물론 프로젝트 빌드도 해본 적이 얼마 없었던 때 크로미움 프로젝트를 진행하면서의 경험을 통해 굉장히 많이 배웠습니다.

### 잡설..

지금 사용하고 있는 맥북도 크로미움 프로젝트를 진행하면서 구매하게 되었습니다. 그때는 그램 노트북에서 리눅스를 설치해 이용하고 있었는데
대회에서 멘토님께서 알려준 크로미움 빌드 방법을 빨리 확인해보고 싶어 서울에서 대전으로 돌아가는 길에 핫스팟을 켜놓고 크로미움 코드를 받고 크로미움을 빌드하였습니다.
그런데 크로미움을 빌드하던 도중 계속해서 컴퓨터가 멈췄습니다. 그때는 리눅스는 개발 만능 환경이라는 생각을 가지고 있었고 하드웨어에 대해서는 전혀 지식이 없어서
원인을 전혀 알 수 없었습니다. 결국 알아낸 원인으로는 크로미움을 빌드하기 위한 사양이었습니다. 그 때 멘토님이 말씀하시기로는 CPU는 큰 문제가 없을 거지만
RAM은 16GB는 되어야 빌드가 가능할 것이라는 말씀을 해주셨습니다. 사용하던 그램은 8GB 램 사양이었고 결국 노트북에서는 빌드할 수 없었습니다.
그 때 프로젝트를 빌드하기 위해 하드웨어 사양도 중요하다는 점을 깨닫게 되었습니다. (핫스팟에서 데이터 사용량이 10GB가 넘게 나오면서 휴대폰 데이터의 GB가 정말 파일용량의 GB라는 것도 알게 되었습니다..)  

결국 그 때 램 16GB에 대한 환상을 갖게 되었고 돈을 모아 지금 사용하는 맥북 프로를 사게 되었습니다. (사실 굳이 맥북은 아니어도 되는데 Mac OS에 대한 환상이..)  

요즘은 대학원에 들어와 개발과는 크게 관련 없는 개념 공부와 연구만 하고 있다 보니 내가 나중에 졸업하고서 바로 개발하는 데 참여할 수 있을까 걱정이 됩니다.
그러던 중 예전에 했던 크로미움 프로젝트가 생각이 나서 오랜만에 빌드해보고 지금 내가 할 수 있을만한 이슈가 있는지 찾아보기로 했습니다.

### Get Chromium code

크로미움을 빌드하기 전 당연하게도 크로미움의 코드를 받아야 합니다. `github`에는 크로미움 코드의 복제본을 저장하는 [mirror][chromium-mirror] 사이트가 있습니다.
물론 mirror 사이트에서도 코드를 받을 수 있지만 chromium projects에 적혀있는 방법을 따라가도록 하겠습니다. chromium projects의
[get the code][get-the-code]에서는 Linux, Windows, Mac 등 각각의 OS 환경에서 크로미움의 코드를 받을 수 있는 방법을 설명하고 있습니다.
저는 개인 맥북에서 작업하기 위해 [Mac][Mac-build]에 나온 설명을 따라 진행하였습니다.

맥북은 XCode 버전이 10.14 SDK 이상이어야 하는데 아래의 명령어로 확인 가능합니다. 

```bash
$ ls `xcode-select -p`/Platforms/MacOSX.platform/Developer/SDKs  // 코드
DriverKit19.0.sdk MacOSX.sdk        MacOSX10.15.sdk  // 수행 결과
```

2번째 결과에서 볼 수 있듯이 `MacOSX10.15.sdk`를 통해 버전 요건을 만족한 것을 확인할 수 있습니다. 이제 chromium의 프로젝트들을 받기 위해 
원하는 위치에 chromium 폴더를 생성해줍니다.

```bash
$ mkdir chromium
$ cd chromium
```

크로미움 프로젝트는 github에 있는 프로젝트와 조금 다른 점이 있습니다. git 관리를 할 때 `depot_tools`라는 도구를 사용한다는 점입니다.
git을 사용하는 것과 크게 다른 점은 없고 git을 그대로 사용해도 괜찮습니다. 하지만 `depot_tools`를 사용하면 조금 더 간단하게 크로미움 프로젝트에서
작업할 수 있습니다. 저는 `depot_tools`의 기능을 이용해 chromium을 다운로드 받겠습니다.

```bash
$ git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
$ export PATH="$PATH:/path/to/depot_tools" // /path/to/는 depot_tools가 있는 경로를 의미
```

depot_tools 프로젝트를 다운받은 후 `export PATH="$PATH:/path/to/depot_tools"` 명령어를 통해 환경변수에 추가할 수 있습니다.
export를 커맨드라인에서 바로 입력하면 됩니다.

만약 이후에도 depot tools의 script를 계속 사용하려면 bash를 이용한다면 `~/.bash_profile`,
zsh를 이용한다면 `~/.zshrc` 파일의 마지막 라인에 `export PATH="$PATH:/path/to/depot_tools"` 명령어를 추가해야합니다.

이 경우 `source ~/.zshrc` 를 수행해 명령어가 한번 실행될 수 있게 합니다. 혹은 명령어를 커맨드라인에 한번 입력하셔도 됩니다.

환경변수를 등록하게 되면 depot tools의 script를 사용할 수 있습니다. 우리는 그 중 `fetch` 명령어를 통해 크로미움 코드를 다운로드 받을 수 있습니다.
하지만 코드를 받기 전 `git config --global core.precomposeUnicode true`명령어를 통해 Unicode 파일이름을 받을 수 있도록 먼저 지정해야 합니다.

Unicode 설정이 끝나면 fetch 명령어를 통해 코드를 받습니다.

> `fetch`명령어는 `git clone`과 같다고 생각하시면 됩니다.

```bash
$ fetch chromium


Running: gclient root


WARNING: Your metrics.cfg file was invalid or nonexistent. A new one will be created.
Running: gclient config --spec 'solutions = [
  {
    "url": "https://chromium.googlesource.com/chromium/src.git",
    "managed": False,
    "name": "src",
    "custom_deps": {},
    "custom_vars": {},
  },
]
'
```

![chromium-file-size](/files/20200201/chromium_file_size.png)
###### 약 37GB의 파일 크기..

fetch 명령어를 실행한 후에는 여러 로그가 나오면서 파일이 받아지게 됩니다. 시간이 오래 걸렸는데 진행이 없는 것 같아도 어느정도 기다려야 합니다.
크로미움의 코드는 현재 날짜(2020/02/01) 기준으로 30GB 이상의 크기로 굉장히 파일 용량 자체도 큰 프로젝트입니다. 재작년에는 10여 GB 였던 것으로
기억하는데 프로젝트를 접했을 때에 비해서 굉장히 늘어난 프로젝트 용량에 조금 놀랍습니다. 이번에 크로미움을 받으면서 약 3시간 정도가 걸렸으며 중간에
인터넷이 끊기며 `gclient`의 통신이 끊겨서였는지 2번 정도 다시 받았습니다. 참고로 중간에 끊기면 파일이 하나도 받아지지 않으니 주의하길 바랍니다.

### Build Chromium code

code를 모두 받았다면 크로미움을 빌드하기 위한 준비가 완료되었습니다. 이제 크로미움을 실행하기 위한 빌드를 해야 합니다. 크로미움은 c++으로 구현된 프로그램으로
`Ninja` 빌드 도구를 이용해 코드를 빌드합니다. Ninja를 이용한 빌드를 위해 크로미움 프로젝트에서는 `depot_tools`의 스크립트 [gn][gn]을 이용합니다.

> gn: Generates Ninja build files 라고 합니다.

gn을 이용해 먼저 build를 위한 폴더를 생성해줍니다. `gn gen` 명령어를 통해 빌드 폴더를 생성할 수 있습니다.
이 때 폴더 이름으로 빌드 설정에 대한 정보를 알 수 있도록 합니다. 폴더 이름에 따라 빌드 설정이 바뀌는 것은 아니나 폴더마다 빌드 설정을 다르게 했을 때
폴더 이름을 보고 쉽게 알 수 있도록 할 수 있습니다.

```bash
$ gn gen out/Default // 기본 설정 
$ gn gen out/Debug   // 디버깅 용도
$ gn gen out/Release // 실제 사용 확인 용도 와 같이 사용할 수 있습니다.
```

빌드 폴더를 생성하면 빌드 설정을 지정할 수 있습니다. 빌드 설정을 지정하는 명령어는 `gn args` 명령어를 통해 지정할 수 있습니다.
`gn args` 명령어를 사용하면 vim을 통해 빌드 설정을 입력할 수 있습니다.

```bash
$ gn args out/Default  
$ gn args out/Debug  
$ gn args out/Release // 설정하려는 폴더를 지정  
```

gn의 설정에 대한 자세한 내용은 [https://gn.googlesource.com/gn/+/master/docs/quick_start.md][gn]에서 확인할 수 있습니다. 
제가 사용하는 설정은 다음과 같습니다.

```
is_debug=true            // 디버깅을 할 경우에는 true
symbol_level=1           // 디버깅에서 사용할 symbol level
is_component_build=true  // 부분 빌드로 코드를 일부 수정했을 때 일부만 빌드해도 되게 하는 기능
enable_nacl=false        // native client 기능을 제거 (속도 향상을 위해)
```

이 빌드 설정들 중 `is_component_build`와 `enable_nacl`은 크게 부작용이 없고 속도 향상을 위해 해두면 좋은 설정으로 보입니다.

빌드 설정을 저장한 후 빌드 설정에 맞게 빌드를 수행할 수 있습니다.

```bash
$ autoninja -C out/Default chrome  
$ autoninja -C out/Debug chrome
$ autoninja -C out/Release chrome  // 폴더 이름에 맞게 지정
```

`autoninja`를 통해 ninja 빌드를 실행할 수 있습니다. 제가 이번에 빌드할 때에는 약 3시간 정도 시간이 걸린 것 같습니다.
빌드를 마치면 OS에 따라 실행 파일이 생성 됩니다. 빌드 중에는 현재 빌드 상태가 어느정도 진행되었는지도 계속 표시되어 확인 가능합니다.

```
$ out/Default/Chromium.app/Contents/MacOS/Chromium // Mac OS 기준 실행파일 위치
$ out/Default/chrome // Linux 기준 실행파일 위치 (윈도우도 같은 위치에 생성)
// Default는 본인이 지정한 폴더 이름
```

![chromium-screen](/files/20200201/chromium_screen.png)
###### chromium 실행 화면

![chromium-after-build](/files/20200201/chromium_file_size_after_build.png)
###### 엄청난 용량

오랜만에 크로미움을 빌드해보았는데 예전에 비해 용량도 커지고 빌드 시간도 많이 늘어난 것 같습니다. 약 37 GB였던 크로미움 폴더가 빌드 후에는 약 **60 GB**가 
되었습니다. 예전에는 두 폴더를 빌드해두고 하나의 이슈를 처리할 때 한 폴더를 작업하고 다른 하나는 master 브렌치를 유지시켜두었는데 지금은 용량 문제도 있어
맥북에서는 어려워 보입니다. 요즘 한동안 쉬던 개발을 크로미움의 issue를 찾아 보면서 다시 시작해보아야겠습니다. 

[chromium-mirror]: https://github.com/chromium/chromium
[get-the-code]: https://www.chromium.org/developers/how-tos/get-the-code
[Mac-build]: https://chromium.googlesource.com/chromium/src/+/master/docs/mac_build_instructions.md

[gn]: https://gn.googlesource.com/gn/+/master/docs/quick_start.md
