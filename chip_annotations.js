
const DEFAULT_TEXT = "Moores Law, named after former Intel CEO Gordon Moore, is the prediction that the number of \
transistors on a new microprocessor doubles every two years. This predicted trend is indicated by the dotted line. \
While just an observation, the fact that it has roughly held for over 40 years has codified it as law.<br></br> Mouseover and zoom on the\
 graph to find out more about each chip and the evolution of consumer CPU."

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
    Intel_4004:"The Intel 4004 was the first microprocessor to be commercially produced and sold, and started the long line of Intel's processors.",
    POWER4:"Increasing clock speeds and datapath widths could only increase single threaded processing power so much, which raised the need for multiprocessing. \
    POWER4 was the first commercial multicore chip, combining multiple processors on a single die.", 
}