
const DEFAULT_TEXT = "Moores Law, named after former Intel CEO Gordon Moore, is the prediction that the number of \
transistors on a new microprocessor doubles every two years. This predicted trend is indicated by the dotted line. \
While just an observation, the fact that it has roughly held for over 40 years has codified it as law.<br></br> Mouseover and zoom on the\
 graph to find out more about each chip and the evolution of consumer computing."

/*
<<<1970>>>
MP944, 4004 - First fully integrated CPU and commercially available processor. 1970
6502 - 1975
Z80 - 1976
8088 - First personal computer - 1979
<<<1980s>>>
8051 - micro - 1980
486/860 - first x86 processor with more than 1 mil and cache - 1989
960CA - First superscalar
ARM2 - Yay embedded 32 - 1986 
<<<1990>>>
AVR - micro - 1997
<<<2000>>>
POWER4 - First commercial multicore - 2001
<<<2010>>>
Ivy Bridge - First 3D transistors or FinFETs - 2011
*/


const CHIP_DESCS = 
{
    MP944:"Historically the first microprocessor, the MP944 was used for the F-14 Tomcat's flight control system. It was declassified by the Navy in 1998.",
    Intel_4004:"The Intel 4004 was the first microprocessor to be commercially produced and sold, and was the first of a long line of Intel processors.",
    Intel_8088:"The Intel 8088 was most known as the chip driving the IBM model 5150 (aka the famous IBM PC), which kicked off the personal computing revolution of the 20th-21st centuries.",
    MOS_Technology_6502:"A famous 8-bit microprocessor known for its ease of use and low cost, which drove down microprocessor pricing across the board. Notable products that used the \
    6502 included the Apple II, the Commodores, the NES, and the Atari.",
    TMS_1000:"While other processors required a variety of external components to operate, a microcontroller integrates most (if not all) of these into a single package. \
    Targeted for embedded systems, the TMS 1000 was the first commercially available microcontroller.",
    POWER4:"Increasing clock speeds and datapath widths could only increase single threaded processing power so much, which raised the need for parallel operation. \
    POWER4 was the first commercial 'multicore' chip, combining multiple processors on a single die.", 
    AVR:"Another entrant to the microcontroller market, the designers worked closely with compiler writers to make the ISA as easily targetable as possible. \
    Today, its descendants are extensively used in the electronic hobbyist sector, driving the popular Arduino line of development boards.",
    Emotion_Engine:"The processor driving Sony's Playstation 2, which, to this day, remains the best-selling game console of all time.",
    "Quad-core_Core_i7_Ivy_Bridge":"As transistor sizing shrinks down further, controlling electron flow obviously becomes harder and harder.\
    Ivy Bridge was the first introduction of 3D FETs, introducing greater surface area between gate and channel. The greater surface area provides\
    better control of the electric state compared to planar FETs.",
    Apple_M1_Ultra:"Linking two Apple M1 Maxes on 1 die, the M1 Ultra tops out at whopping 114 billion transistors, the current record for number of transistors on a personal\
    computing chip.",
    AMD_K5:"This was AMD's first x86 processor developed entirely in house and a challenge to Intel's dominance on the CPU market.",
    POWER1:"A followup to the lukewarm ROMP processor, it formed the backbone for IBM's POWER ISA.",
    Intel_80486:"The 80486 (or i486) was one of the first chips to feature more than 1 million transistors and an integrated 8 kilobyte data cache.",
    ARM_1:"The first ARM processor. ARM (formerly known as Acorn Computers) developed the ARM1 to upgrade the BBC Micro, a computer system commissioned by the British Broadcasting\
    Corporation to improve computer literacy & coding abilities in the UK.",
    AMD_Epyc:"AMD's attempt to re-enter the server computing market, it powers the Frontier supercomputer, which remains the most powerful supercomputer to date.",
    Pentium_4_Cedar_Mill: "The latest entry in Intel's Pentium 4 line, which gained an unfortunate reputation for high power consumption and heat.",
    Core_2_Duo_Conroe:"Among the first Intel processors based on the new Core microarchitecture, which resolved non-negligible heat issues in the previous Pentium 4 & Netburst architectures."
}