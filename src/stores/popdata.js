import { defineStore } from 'pinia'

export const usepopdataStore = defineStore({
    id: 'popdata',
    state: () => ({
        RADIO_CHECK_BOX: 'C',           //用于标记显示多选列表还是单选列表, C表示多选,R表示单选
        last_checkbox_ids: [],          //记录最后显示的是哪个多选数据
        last_radiobox_ids: [],          //记录最后显示的是哪个多选数据

        pagePublic_List: [],            //前台页面多选值循环用
        pagePublic_Selected: [],        //控制哪些多选项被勾选

        pageRadio_List: [],             //前台页面单选值循环用
        pageRadio_CurrentValue: '',      //记录当前选中的单选的值 

        ScanPolicy_List: [
            { val: '0x00000001', des: '限定为⽂件系统（OC_SCAN_FILE_SYSTEM_LOCK）' },
            { val: '0x00000002', des: '限定为设备类型（OC_SCAN_DEVICE_LOCK）' },
            { val: '0x00000100', des: '允许扫描 APFS ⽂件系统（OC_SCAN_ALLOW_FS_APFS）' },
            { val: '0x00000200', des: '允许扫描 HFS ⽂件系统（OC_SCAN_ALLOW_FS_HFS）' },
            { val: '0x00000400', des: '允许扫描 EFI System Partition/ESP ⽂件系统（OC_SCAN_ALLOW_FS_ESP）' },
            { val: '0x00000800', des: '允许扫描 NTFS（Windows）⽂件系统（OC_SCAN_ALLOW_FS_NTFS）' },
            { val: '0x00001000', des: '允许扫描 EXT（Linux）⽂件系统（OC_SCAN_ALLOW_FS_EXT）' },
            { val: '0x00010000', des: '允许扫描 SATA 设备（OC_SCAN_ALLOW_DEVICE_SATA）' },
            { val: '0x00020000', des: '允许扫描 SAS 和 Mac NVMe 设备（OC_SCAN_ALLOW_DEVICE_SASEX）' },
            { val: '0x00040000', des: '允许扫描 SCSI 设备（OC_SCAN_ALLOW_DEVICE_SCSI）' },
            { val: '0x00080000', des: '允许扫描 NVMe 设备（OC_SCAN_ALLOW_DEVICE_NVME）' },
            { val: '0x00100000', des: '允许扫描 CD/DVD 旧SATA 设备（OC_SCAN_ALLOW_DEVICE_ATAPI）' },
            { val: '0x00200000', des: '允许扫描 USB 设备（OC_SCAN_ALLOW_DEVICE_USB）' },
            { val: '0x00400000', des: '允许扫描 FireWire 设备（OC_SCAN_ALLOW_DEVICE_FIREWIRE）' },
            { val: '0x00800000', des: '允许扫描读卡器设备（OC_SCAN_ALLOW_DEVICE_SDCARD）' },
            { val: '0x01000000', des: '允许扫描PCI设备（OC_SCAN_ALLOW_DEVICE_PCI）' }
        ],


        ExposeSensitiveData_List: [
            { val: '0x01', des: '将可打印的引导程序路径公开为UEFI变量（Expose the printable booter path as a UEFI variable）' },
            { val: '0x02', des: '将OpenCore版本公开为UEFI变量（Expose the OpenCore version as a UEFI variable）' },
            { val: '0x04', des: '在引导选择器菜单标题中公开OpenCore版本（ Expose the OpenCore version in the OpenCore picker menu title）' },
            { val: '0x08', des: '将OEM信息公开为一组UEFI变量（ Expose OEM information as a set of UEFI variables）' }
        ]

        , DisplayLevel_List: [
            { val: '0x00000002', des: 'DEBUG_WARN in DEBUG, NOOPT, RELEASE' },
            { val: '0x00000040', des: 'DEBUG_INFO in DEBUG, NOOPT' },
            { val: '0x00400000', des: 'DEBUG_VERBOSE in custom builds' },
            { val: '0x80000000', des: 'DEBUG_ERROR in DEBUG, NOOPT, RELEASE' }
        ]

        , Target_List: [

            { val: '0x01', des: '启用日志记录，否则所有日志将被丢弃（Enable logging, otherwise all log is discarded）' },
            { val: '0x02', des: '启用基本控制台（屏幕上）日志记录（Enable basic console (onscreen) logging）' },
            { val: '0x04', des: '启用日志记录到数据中心（Enable logging to Data Hub）' },
            { val: '0x08', des: '启用串行端口日志记录（Enable serial port logging）' },
            { val: '0x10', des: '启用UEFI变量记录（Enable UEFI variable logging）' },
            { val: '0x20', des: '启用非易失性UEFI变量日志记录（Enable non-volatile UEFI variable logging）' },
            { val: '0x40', des: '启用记录到文件（ Enable logging to file）' },
            { val: '0x80', des: '与0x40结合使用时，启用更快但不安全的文件记录（ In combination with 0x40, enable faster but unsafe (see Warning 2 below) file logging）' }
        ]

        , PickerAttributes_List: [
            { val: '0x0001', des: 'OC_ATTR_USE_VOLUME_ICON，为启动项提供自定义图标' },
            { val: '0x0002', des: 'OC_ATTR_USE_DISK_LABEL_FILE，为启动项提供定制的呈现标题' },
            { val: '0x0004', des: 'OC_ATTR_USE_GENERIC_LABEL_IMAGE，为没有自定义条目的引导条目提供了预定义的标签图像' },
            { val: '0x0008', des: 'OC_ATTR_USE_ALTERNATE_ICONS，将已使用图标集更改为备用图标（如果支持）' }
        ]

        , TypeDetail_List: [
            { val: '0x0002', des: '其它' },
            { val: '0x0004', des: '未知' },
            { val: '0x0080', des: '同步' },
            { val: '0x2000', des: '已注册（已缓存）' },
            { val: '0x4000', des: '未缓存（未注册）' }
        ]

        , PickerVariant_List: [
            { val: 'Auto', des: 'Auto - 根据DefaultBackground颜色自动选择一组图标' },
            { val: 'Default', des: 'Default - 普通图标集（不带前缀） Acidanthera\\GoldenGate' }

        ]

        , KernelArch_List: [
            { val: 'Auto', des: 'Auto - 自动选择首选架构' },
            { val: 'i386', des: 'i386 - 可用时使用i386（32位）内核' },
            { val: 'i386-user32', des: 'i386-user32 - 在可用时使用i386（32位）内核，并在64位上强制使用32位（如果操作系统支持）' },
            { val: 'x86_64', des: 'x86_64 - 可用时使用x86_64（64位）内核' }
        ]

        , KernelCache_List: [
            { val: 'Auto', des: 'Auto - 自动' },
            { val: 'Cacheless', des: 'Cacheless - 无缓存' },
            { val: 'Mkext', des: 'Mkext - 巴拉巴拉' },
            { val: 'Prelinked', des: 'Prelinked - 巴拉巴拉' }
        ]

        , Resolution_List: [
            { val: 'Max', des: 'Max - 使用最大的可用屏幕分辨率' },
            { val: '1152x864', des: '1152x864' },
            { val: '1280x720', des: '1280x720' },
            { val: '1280x800', des: '1280x800' },
            { val: '1280x1024', des: '1280x1024' },
            { val: '1360x768', des: '1360x768' },
            { val: '1366x768', des: '1366x768' },
            { val: '1400x1050', des: '1400x1050' },
            { val: '1440x900', des: '1440x900' },
            { val: '1600x900', des: '1600x900' },
            { val: '1600x1200', des: '1600x1200' },
            { val: '1680x1050', des: '1680x1050' },
            { val: '1920x1080', des: '1920x1080' },
            { val: '2048x1252', des: '2048x1252' },
            { val: '2048x1536', des: '2048x1536' },
            { val: '2560x1600', des: '2560x1600' },
            { val: '2560x2048', des: '2560x2048' },
            { val: '3840x2160', des: '3840x2160' },
            { val: '4096x2160', des: '4096x2160' },
            { val: '5120x2880', des: '5120x2880' }

        ]

        ,ConsoleMode_List: [
            { val: 'Max', des: 'Max - 使用最大的可用屏幕分辨率' },
            { val: '1152x864', des: '1152x864' },
            { val: '1280x720', des: '1280x720' },
            { val: '1280x800', des: '1280x800' },
            { val: '1280x1024', des: '1280x1024' },
            { val: '1360x768', des: '1360x768' },
            { val: '1366x768', des: '1366x768' },
            { val: '1400x1050', des: '1400x1050' },
            { val: '1440x900', des: '1440x900' },
            { val: '1600x900', des: '1600x900' },
            { val: '1600x1200', des: '1600x1200' },
            { val: '1680x1050', des: '1680x1050' },
            { val: '1920x1080', des: '1920x1080' },
            { val: '2048x1252', des: '2048x1252' },
            { val: '2048x1536', des: '2048x1536' },
            { val: '2560x1600', des: '2560x1600' },
            { val: '2560x2048', des: '2560x2048' },
            { val: '3840x2160', des: '3840x2160' },
            { val: '4096x2160', des: '4096x2160' },
            { val: '5120x2880', des: '5120x2880' }

        ]


        , LauncherOption_List: [
            { val: 'Disabled', des: 'Disabled — 啥也不干' },
            { val: 'Full', des: 'Full — 在启动引导程序时在UEFI变量存储中创建或更新最优先启动选项' },
            { val: 'Short', des: 'Short — 创建短启动选项，而不是完整的启动选项' }

        ],
        AppleEvent_List: [
            { val: 'Auto', des: 'Auto — 自动选择实现' },
            { val: 'Builtin', des: 'Builtin — 使用OpenCore更新的Apple Event协议重新实现' },
            { val: 'OEM', des: 'OEM — 假设在驱动程序连接时可以使用Apple的协议' }
        ],
        CustomDelays_List: [
            { val: 'true', des: 'true — 使用 KeyInitialDelay 和 KeySubsequentDelay 的值' },
            { val: 'false', des: 'false — 使用 Apple 默认值 500ms (50) 和 50ms (5)' }
        ],
        GopPassThrough_List: [
            { val: 'Enabled', des: 'Enabled — 为所有 UGA 协议提供 GOP' },
            { val: 'Apple', des: 'Apple — 为支持 AppleFramebufferInfo 的协议提供 GOP' },
            { val: 'Disabled', des: 'Disabled — 不提供 GOP' }
        ],
        UIScale_List: [
            { val: -1, des: '-1 — 保持当前变量不变' },
            { val: 0, des: '0 — 根据当前分辨率自动选择缩放比例' },
            { val: 1, des: '1 — 1x 缩放，对应于正常显示' },
            { val: 2, des: '2 — 不2x 缩放，对应于 HiDPI 显示' }
        ],
        TextRenderer_List: [
            { val: 'BuiltinGraphics', des: 'BuiltinGraphics — 切换到图形模式并使用带有自定义 ConsoleControl 的内置渲染器' },
            { val: 'BuiltinText', des: 'BuiltinText — 切换到文本模式并使用带有自定义 ConsoleControl 的内置渲染器' },
            { val: 'SystemGraphics', des: 'SystemGraphics — 切换到图形模式并使用带有自定义 ConsoleControl 的系统渲染器' },
            { val: 'SystemText', des: 'SystemText — 切换到文本模式并使用带有自定义 ConsoleControl 的系统渲染器' },
            { val: 'SystemGeneric', des: 'SystemGeneric — 将系统渲染器与系统 ConsoleControl 一起使用，假设它行为正确' }
        ],
        HibernateMode_List: [
            { val: 'None', des: 'None — 忽略休眠状态' },
            { val: 'Auto', des: 'Auto — 使用 RTC 和 NVRAM 检测' },
            { val: 'RTC', des: 'RTC — 使用 RTC 检测' },
            { val: 'NVRAM', des: 'NVRAM — 使用 NVRAM 检测' }
        ],
        PickerMode_List: [
            { val: 'Builtin', des: 'Builtin — 引导管理由OpenCore处理，使用了纯文本用户界面' },
            { val: 'External', des: 'External — 如果可用，则使用外部引导管理协议。否则使用内置模式' },
            { val: 'Apple', des: 'Apple — 如果可用，则使用Apple引导管理。否则使用内置模式' }
        ],
        Vault_List: [
            { val: 'Optional', des: 'Optional — 什么都不需要，没有强制执行保险库，不安全' },
            { val: 'Basic', des: 'Basic — 要求 OC 目录中存在 Vault.plist 文件' },
            { val: 'Secure', des: 'Secure — 要求 OC 目录中的 vault.plist 需要 vault.sig 签名文件' }
        ],
        DmgLoading_List: [
            { val: 'Disabled', des: 'Disabled — 加载 DMG 图像将失败' },
            { val: 'Signed', des: 'Signed — 只会加载 Apple 签名的 DMG 图像' },
            { val: 'Any', des: 'Any — 任何 DMG 映像都将作为普通文件系统挂载' }
        ],
        SecureBootModel_List: [
            { val: 'Default', des: 'Default' },
            { val: 'Disabled', des: 'Disabled' },
            { val: 'j137', des: 'j137 — iMacPro1,1 (December 2017)' },
            { val: 'j680', des: 'j680 — MacBookPro15,1 (July 2018)' },
            { val: 'j132', des: 'j132 — MacBookPro15,2 (July 2018)' },
            { val: 'j174', des: 'j174 — Macmini8,1 (October 2018)' },
            { val: 'j140k', des: 'j140k — MacBookAir8,1 (October 2018)' },
            { val: 'j780', des: 'j780 — MacBookPro15,3 (May 2019)' },
            { val: 'j213', des: 'j213 — MacBookPro15,4 (July 2019)' },
            { val: 'j140a', des: 'j140a — MacBookAir8,2 (July 2019)' },
            { val: 'j152f', des: 'j152f — MacBookPro16,1 (November 2019)' },
            { val: 'j160', des: 'j160 — MacPro7,1 (December 2019)' },
            { val: 'j230k', des: 'j230k — MacBookAir9,1 (March 2020)' },
            { val: 'j214k', des: 'j214k — MacBookPro16,2 (May 2020)' },
            { val: 'j223', des: 'j223 — MacBookPro16,3 (May 2020)' },
            { val: 'j215', des: 'j215 — MacBookPro16,4 (June 2020)' },
            { val: 'j185', des: 'j185 — iMac20,1 (August 2020)' },
            { val: 'j185f', des: 'j185f — iMac20,2 (August 2020)' },
            { val: 'x86legacy', des: 'x86legacy — Macs and VMs without T2 chip minimum macOS 11.0' }
        ],
        SystemMemoryStatus_List: [
            { val: 'Auto', des: 'Auto — 系统内存状态' },
            { val: 'Upgradable', des: 'Upgradable — 在 PlatformFeature 中明确取消设置 PT_FEATURE_HAS_SOLDERED_SYSTEM_MEMORY (0x2)' },
            { val: 'Soldered', des: 'Soldered — 在 PlatformFeature 中显式设置 PT_FEATURE_HAS_SOLDERED_SYSTEM_MEMORY (0x2)' }
        ],
        UpdateSMBIOSMode_List: [
            { val: 'Create', des: 'Create — 用新分配的 EfiReservedMemoryType 在 AllocateMaxAddress 替换表而不任何后备' },
            { val: 'TryOverwrite', des: 'TryOverwrite — 如果新尺寸 <= 比页面对齐的原始尺寸，并且没有问题，则覆盖遗留区域解锁' },
            { val: 'Overwrite', des: 'Overwrite — 如果适合新大小，则覆盖现有的 gEfiSmbiosTableGuid 和 gEfiSmbiosTable3Guid 数据' },
            { val: 'Custom', des: 'Custom — 将 SMBIOS 表 ( gEfiSmbios(3)TableGuid ) 写入 gOcCustomSmbios(3)TableGuid 以解决问题固件在 ExitBootServices 覆盖 SMBIOS 内容' }
        ],
        PlayChime_List: [
            { val: 'Auto', des: 'Auto — 当 StartupMute NVRAM 变量不存在或设置为 00 时启用提示音' },
            { val: 'Enabled', des: 'Enabled — 无条件启用铃声' },
            { val: 'Disabled', des: 'Disabled — 无条件禁用铃声' }
        ],
        KeySupportMode_List: [
            { val: 'Auto', des: 'Auto — 使用以下首选项执行自动选择：AMI、V2、V1' },
            { val: 'V1', des: 'V1 — 使用 UEFI 标准传统输入协议 EFI_SIMPLE_TEXT_INPUT_PROTOCOL' },
            { val: 'V2', des: 'V2 — 使用 UEFI 标准现代输入协议 EFI_SIMPLE_TEXT_INPUT_EX_PROTOCOL' },
            { val: 'AMI', des: 'AMI — 使用 APTIO 输入协议 AMI_EFIKEYCODE_PROTOCOL' }
        ],
        SystemProductName_List: [
            { val: 'MacPro1,1', des: 'MacPro1,1 - Intel Core Xeon 5130 x2 @ 2.00 GHz' },
            { val: 'MacPro2,1', des: 'MacPro2,1 - Intel Xeon X5365 x2 @ 3.00 GHz' },
            { val: 'MacPro3,1', des: 'MacPro3,1 - Intel Xeon E5462 x2 @ 2.80 GHz' },
            { val: 'MacPro4,1', des: 'MacPro4,1 - Intel Xeon W3520 @ 2.66 GHz' },
            { val: 'MacPro5,1', des: 'MacPro5,1 - Intel Xeon W3530 @ 2.80 GHz' },
            { val: 'MacPro6,1', des: 'MacPro6,1 - Intel Xeon E5-1620 v2 @ 3.70 GHz' },
            { val: 'MacPro7,1', des: 'MacPro7,1 - Intel Xeon W-3245M CPU @ 3.20 GHz' },
            { val: 'MacBook1,1', des: 'MacBook1,1 - Intel Core Duo T2400 @ 1.83 GHz' },
            { val: 'MacBook2,1', des: 'MacBook2,1 - Intel Core 2 Duo T5600 @ 1.83 GHz' },
            { val: 'MacBook3,1', des: 'MacBook3,1 - Intel Core 2 Duo T7500 @ 2.20 GHz' },
            { val: 'MacBook4,1', des: 'MacBook4,1 - Intel Core 2 Duo T8300 @ 2.40 GHz' },
            { val: 'MacBook5,1', des: 'MacBook5,1 - Intel Core 2 Duo P8600 @ 2.40 GHz' },
            { val: 'MacBook5,2', des: 'MacBook5,2 - Intel Core 2 Duo P7450 @ 2.13 GHz' },
            { val: 'MacBook6,1', des: 'MacBook6,1 - Intel Core 2 Duo P7550 @ 2.26 GHz' },
            { val: 'MacBook7,1', des: 'MacBook7,1 - Intel Core 2 Duo P8600 @ 2.40 GHz' },
            { val: 'MacBook8,1', des: 'MacBook8,1 - Intel Core M 5Y51 @ 1.10 GHz' },
            { val: 'MacBook9,1', des: 'MacBook9,1 - Intel Core m3-6Y30 @ 1.10 GHz' },
            { val: 'MacBook10,1', des: 'MacBook10,1 - Intel Core m3-7Y32 @ 1.10 GHz' },
            { val: 'MacBookAir1,1', des: 'MacBookAir1,1 - Intel Core 2 Duo P7500 @ 1.60 GHz' },
            { val: 'MacBookAir2,1', des: 'MacBookAir2,1 - Intel Core 2 Duo SL9600 @ 2.13 GHz' },
            { val: 'MacBookAir3,1', des: 'MacBookAir3,1 - Intel Core 2 Duo SU9400 @ 1.40 GHz' },
            { val: 'MacBookAir3,2', des: 'MacBookAir3,2 - Intel Core 2 Duo SL9400 @ 1.86 GHz' },
            { val: 'MacBookAir4,1', des: 'MacBookAir4,1 - Intel Core i5-2467M @ 1.60 GHz' },
            { val: 'MacBookAir4,2', des: 'MacBookAir4,2 - Intel Core i5-2557M @ 1.70 GHz' },
            { val: 'MacBookAir5,1', des: 'MacBookAir5,1 - Intel Core i5-3317U @ 1.70 GHz' },
            { val: 'MacBookAir5,2', des: 'MacBookAir5,2 - Intel Core i5-3317U @ 1.70GHz' },
            { val: 'MacBookAir6,1', des: 'MacBookAir6,1 - Intel Core i5-4250U @ 1.30 GHz' },
            { val: 'MacBookAir6,2', des: 'MacBookAir6,2 - Intel Core i5-4250U @ 1.30 GHz' },
            { val: 'MacBookAir7,1', des: 'MacBookAir7,1 - Intel Core i5-5250U @ 1.60 GHz' },
            { val: 'MacBookAir7,2', des: 'MacBookAir7,2 - Intel Core i5-5250U @ 1.60 GHz' },
            { val: 'MacBookAir8,1', des: 'MacBookAir8,1 - Intel Core i5-8210Y @ 1.60 GHz' },
            { val: 'MacBookAir8,2', des: 'MacBookAir8,2 - Intel Core i5-8210Y @ 1.60 GHz' },
            { val: 'MacBookAir9,1', des: 'MacBookAir9,1 - Intel Core i3-1000NG4 @ 1.10 GHz' },
            { val: 'MacBookPro1,1', des: 'MacBookPro1,1 - Intel Core Duo L2400 @ 1.66 GHz' },
            { val: 'MacBookPro1,2', des: 'MacBookPro1,2 - Intel Core Duo T2600 @ 2.16 GHz' },
            { val: 'MacBookPro2,1', des: 'MacBookPro2,1 - Intel Core 2 Duo T7600 @ 2.33 GHz' },
            { val: 'MacBookPro2,2', des: 'MacBookPro2,2 - Intel Core 2 Duo T7400 @ 2.16 GHz' },
            { val: 'MacBookPro3,1', des: 'MacBookPro3,1 - Intel Core 2 Duo T7700 @ 2.40 GHz' },
            { val: 'MacBookPro4,1', des: 'MacBookPro4,1 - Intel Core 2 Duo T8300 @ 2.40 GHz' },
            { val: 'MacBookPro5,1', des: 'MacBookPro5,1 - Intel Core 2 Duo P8600 @ 2.40 GHz' },
            { val: 'MacBookPro5,2', des: 'MacBookPro5,2 - Intel Core 2 Duo T9600 @ 2.80 GHz' },
            { val: 'MacBookPro5,3', des: 'MacBookPro5,3 - Intel Core 2 Duo P8800 @ 2.66 GHz' },
            { val: 'MacBookPro5,4', des: 'MacBookPro5,4 - Intel Core 2 Duo P8700 @ 2.53 GHz' },
            { val: 'MacBookPro5,5', des: 'MacBookPro5,5 - Intel Core 2 Duo P7550 @ 2.26 GHz' },
            { val: 'MacBookPro6,1', des: 'MacBookPro6,1 - Intel Core i5-540M @ 2.53 GHz' },
            { val: 'MacBookPro6,2', des: 'MacBookPro6,2 - Intel Core i5-520M @ 2.40 GHz' },
            { val: 'MacBookPro7,1', des: 'MacBookPro7,1 - Intel Core 2 Duo P8600 @ 2.40 GHz' },
            { val: 'MacBookPro8,1', des: 'MacBookPro8,1 - Intel Core i5-2415M @ 2.30 GHz' },
            { val: 'MacBookPro8,2', des: 'MacBookPro8,2 - Intel Core i7-2675QM @ 2.20 GHz' },
            { val: 'MacBookPro8,3', des: 'MacBookPro8,3 - Intel Core i7-2820QM @ 2.30 GHz' },
            { val: 'MacBookPro9,1', des: 'MacBookPro9,1 - Intel Core i7-3615QM @ 2.30 GHz' },
            { val: 'MacBookPro9,2', des: 'MacBookPro9,2 - Intel Core i5-3210M @ 2.50 GHz' },
            { val: 'MacBookPro10,1', des: 'MacBookPro10,1 - Intel Core i7-3615QM @ 2.30 GHz' },
            { val: 'MacBookPro10,2', des: 'MacBookPro10,2 - Intel Core i5-3210M @ 2.50 GHz' },
            { val: 'MacBookPro11,1', des: 'MacBookPro11,1 - Intel Core i5-4258U @ 2.40 GHz' },
            { val: 'MacBookPro11,2', des: 'MacBookPro11,2 - Intel Core i7-4770HQ @ 2.20 GHz' },
            { val: 'MacBookPro11,3', des: 'MacBookPro11,3 - Intel Core i7-4850HQ @ 2.30 GHz' },
            { val: 'MacBookPro11,4', des: 'MacBookPro11,4 - Intel Core i7-4770HQ @ 2.20 GHz' },
            { val: 'MacBookPro11,5', des: 'MacBookPro11,5 - Intel Core i7-4870HQ @ 2.50 GHz' },
            { val: 'MacBookPro12,1', des: 'MacBookPro12,1 - Intel Core i5-5257U @ 2.70 GHz' },
            { val: 'MacBookPro13,1', des: 'MacBookPro13,1 - Intel Core i5-6360U @ 2.00 GHz' },
            { val: 'MacBookPro13,2', des: 'MacBookPro13,2 - Intel Core i7-6567U @ 3.30 GHz' },
            { val: 'MacBookPro13,3', des: 'MacBookPro13,3 - Intel Core i7-6700HQ @ 2.60 GHz' },
            { val: 'MacBookPro14,1', des: 'MacBookPro14,1 - Intel Core i5-7360U @ 2.30 GHz' },
            { val: 'MacBookPro14,2', des: 'MacBookPro14,2 - Intel Core i5-7267U @ 3.10 GHz' },
            { val: 'MacBookPro14,3', des: 'MacBookPro14,3 - Intel Core i7-7700HQ @ 2.80 GHz' },
            { val: 'MacBookPro15,1', des: 'MacBookPro15,1 - Intel Core i7-8750H @ 2.20 GHz' },
            { val: 'MacBookPro15,2', des: 'MacBookPro15,2 - Intel Core i7-8559U @ 2.70 GHz' },
            { val: 'MacBookPro15,3', des: 'MacBookPro15,3 - Intel Core i7-8850H @ 2.60 GHz' },
            { val: 'MacBookPro15,4', des: 'MacBookPro15,4 - Intel Core i5-8257U @ 1.40 GHz' },
            { val: 'MacBookPro16,1', des: 'MacBookPro16,1 - Intel Core i7-9750H @ 2.60 GHz' },
            { val: 'MacBookPro16,2', des: 'MacBookPro16,2 - Intel Core i5-1038NG7 @ 2.00 GHz' },
            { val: 'MacBookPro16,3', des: 'MacBookPro16,3 - Intel Core i5-8257U @ 1.40 GHz' },
            { val: 'MacBookPro16,4', des: 'MacBookPro16,4 - Intel Core i7-9750H @ 2.60 GHz' },
            { val: 'Macmini1,1', des: 'Macmini1,1 - Intel Core Solo T1200 @ 1.50 GHz' },
            { val: 'Macmini2,1', des: 'Macmini2,1 - Intel Core 2 Duo T5600 @ 1.83 GHz' },
            { val: 'Macmini3,1', des: 'Macmini3,1 - Intel Core 2 Duo P7350 @ 2.00 GHz' },
            { val: 'Macmini4,1', des: 'Macmini4,1 - Intel Core 2 Duo P8600 @ 2.40 GHz' },
            { val: 'Macmini5,1', des: 'Macmini5,1 - Intel Core i5-2415M @ 2.30 GHz' },
            { val: 'Macmini5,2', des: 'Macmini5,2 - Intel Core i5-2520M @ 2.50 GHz' },
            { val: 'Macmini5,3', des: 'Macmini5,3 - Intel Core i7-2635QM @ 2.00 GHz' },
            { val: 'Macmini6,1', des: 'Macmini6,1 - Intel Core i5-3210M @ 2.50 GHz' },
            { val: 'Macmini6,2', des: 'Macmini6,2 - Intel Core i7-3615QM @ 2.30 GHz' },
            { val: 'Macmini7,1', des: 'Macmini7,1 - Intel Core i5-4260U @ 1.40 GHz' },
            { val: 'Macmini8,1', des: 'Macmini8,1 - Intel Core i7-8700B @ 3.20 GHz' },
            { val: 'Xserve1,1', des: 'Xserve1,1 - Intel Xeon 5130 x2 @ 2.00 GHz' },
            { val: 'Xserve2,1', des: 'Xserve2,1 - Intel Xeon E5462 x2 @ 2.80 GHz' },
            { val: 'Xserve3,1', des: 'Xserve3,1 - Intel Xeon E5520 x2 @ 2.26 GHz' },
            { val: 'iMacPro1,1', des: 'iMacPro1,1 - Intel Xeon W-2140B CPU @ 3.20 GHz' },
            { val: 'iMac4,1', des: 'iMac4,1 - Intel Core Duo T2400 @ 1.83 GHz' },
            { val: 'iMac4,2', des: 'iMac4,2 - Intel Core Duo T2400 @ 1.83 GHz' },
            { val: 'iMac5,1', des: 'iMac5,1 - Intel Core 2 Duo T7200 @ 2.00 GHz' },
            { val: 'iMac5,2', des: 'iMac5,2 - Intel Core 2 Duo T5600 @ 1.83 GHz' },
            { val: 'iMac6,1', des: 'iMac6,1 - Intel Core 2 Duo T7400 @ 2.16 GHz' },
            { val: 'iMac7,1', des: 'iMac7,1 - Intel Core 2 Duo T7300 @ 2.00 GHz' },
            { val: 'iMac8,1', des: 'iMac8,1 - Intel Core 2 Duo E8435 @ 3.06 GHz' },
            { val: 'iMac9,1', des: 'iMac9,1 - Intel Core 2 Duo E8135 @ 2.66 GHz' },
            { val: 'iMac10,1', des: 'iMac10,1 - Intel Core 2 Duo E7600 @ 3.06 GHz' },
            { val: 'iMac11,1', des: 'iMac11,1 - Intel Core i5-750 @ 2.66 GHz' },
            { val: 'iMac11,2', des: 'iMac11,2 - Intel Core i3-540 @ 3.06 GHz' },
            { val: 'iMac11,3', des: 'iMac11,3 - Intel Core i5-760 @ 2.80 GHz' },
            { val: 'iMac12,1', des: 'iMac12,1 - Intel Core i5-2400S @ 2.50 GHz' },
            { val: 'iMac12,2', des: 'iMac12,2 - Intel Core i7-2600 @ 3.40 GHz' },
            { val: 'iMac13,1', des: 'iMac13,1 - Intel Core i7-3770S @ 3.10 GHz' },
            { val: 'iMac13,2', des: 'iMac13,2 - Intel Core i5-3470S @ 2.90 GHz' },
            { val: 'iMac13,3', des: 'iMac13,3 - Intel Core i5-3470S @ 2.90 GHz' },
            { val: 'iMac14,1', des: 'iMac14,1 - Intel Core i5-4570R @ 2.70 GHz' },
            { val: 'iMac14,2', des: 'iMac14,2 - Intel Core i7-4771 @ 3.50 GHz' },
            { val: 'iMac14,3', des: 'iMac14,3 - Intel Core i5-4570S @ 2.90 GHz' },
            { val: 'iMac14,4', des: 'iMac14,4 - Intel Core i5-4260U @ 1.40 GHz' },
            { val: 'iMac15,1', des: 'iMac15,1 - Intel Core i7-4790k @ 4.00 GHz' },
            { val: 'iMac16,1', des: 'iMac16,1 - Intel Core i5-5250U @ 1.60 GHz' },
            { val: 'iMac16,2', des: 'iMac16,2 - Intel Core i5-5675R @ 3.10 GHz' },
            { val: 'iMac17,1', des: 'iMac17,1 - Intel Core i5-6500 @ 3.20 GHz' },
            { val: 'iMac18,1', des: 'iMac18,1 - Intel Core i5-7360U @ 2.30 GHz' },
            { val: 'iMac18,2', des: 'iMac18,2 - Intel Core i5-7400 @ 3.00 GHz' },
            { val: 'iMac18,3', des: 'iMac18,3 - Intel Core i5-7600K @ 3.80 GHz' },
            { val: 'iMac19,1', des: 'iMac19,1 - Intel Core i9-9900K @ 3.60 GHz' },
            { val: 'iMac19,2', des: 'iMac19,2 - Intel Core i5-8500 @ 3.00 GHz' },
            { val: 'iMac20,1', des: 'iMac20,1 - Intel Core i5-10500 @ 3.10 GHz' },
            { val: 'iMac20,2', des: 'iMac20,2 - Intel Core i9-10910 @ 3.60 GHz' }
        ]
    }),
    getters: {

    },
    actions: {

    }
})