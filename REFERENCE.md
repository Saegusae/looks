# Looks | Appearence Reference

**Credits:** *Caali* | [Github](https://github.com/hackerman-caali) | [Discord](https://discord.gg/maqBmJV)

---

Data Size for each Category

* Base: 8 Bytes
* Details: 32 Bytes
* Shape: 64 Bytes

---

Category | Slider | Item | Data Type
---|---|:---|:---:
Base | Unkn1 | | uint8
Base | Face | Color | uint8
Base | Face | Style | uint8
Base | Adornments | Skin | uint8
Base | Features | Style | uint8
Base | Features | Color | uint8
Base | Voice | | uint8
Base | Adornments | Tattoos | | uint8
Details | Bone Structure | Brow | uint8
Details | Bone Structure | Cheekbones | uint8
Details | Bone Structure | Jaw | uint8
Details | Bone Structure | Jaw Jut | uint8
Details | Ears | Rotation | uint8
Details | Ears | Extension | uint8
Details | Ears | Trim | uint8
Details | Ears | Size | uint8
Details | Eyes | Width | uint8
Details | Eyes | Height | uint8
Details | Eyes | Separation | uint8
Details | Unkn1 | uint8
Details | Eyes | Angle | uint8
Details | Eyes | Inner Brow | uint8
Details | Eyes | Outer Brow | uint8
Details | Unkn2 | uint8
Details | Nose | Extension | uint8
Details | Nose | Size | uint8
Details | Nose | Bridge | uint8
Details | Nose | Nostril Width | uint8
Details | Nose | Tip Width | uint8
Details | Nose | Tip | uint8
Details | Nose | Nostril Flare | uint8
Details | Mouth | Pucker | uint8
Details | Mouth | Position | uint8
Details | Mouth | Width | uint8
Details | Mouth | Lip Thickness | uint8
Details | Mouth | Corners | uint8
Details | Eyes | Shape | uint8
Details | Nose | Bend | uint8
Details | BoneStructure | Jaw Width | uint8
Details | Mouth | Gape | uint8
Shape | Head | Size 1 | uint8
Shape | Thighs | Size 1 | uint8
Shape | Thighs | Size 2 | uint8
Shape | Calf | Size 1 | uint8
Shape | Calf | Twist | uint8
Shape | Upper Arm | Size 1 | uint8
Shape | Upper Arm | Size 2 | uint8
Shape | Forearm | * | uint8
Shape | Forearm | Twist* | uint8
Shape | Spine | 1* | uint8
Shape | Spine | 2* | uint8
Shape | Spine | 3* | uint8
Shape | Spine | 4* | uint8
Shape | Head | Size 2 | uint8
Shape | Eyes | 1* | uint8
Shape | Eyes | 2* | uint8
Shape | Head | Size 3 | uint8
Shape | Calf | Size 2 | uint8
Shape | Bip | * | uint8
Shape | | | uint8
Shape | Breasts | Size 1 | uint8
Shape | Breasts | Size 2 | uint8
Shape | Breasts | Size 3 (The Seleriana Special) | uint8
Shape | **Unused** | | byte[41]

---

## Notes:
* The data is in order of packet decryption.
* " * " indicates unkown use.
* All data was taken from Caali's private server project check him out on discord.