/* Small C program to play the Legend of Zelda theme on the system speaker */
/* Licensed under the terms of the WTFPL (http://sam.zoy.org/wtfpl/) */

#include <windows.h>

#define NOTE_C 	262
#define NOTE_CSHARP 277
#define NOTE_D 	294
#define NOTE_DSHARP 311
#define NOTE_E 	330
#define NOTE_F 	349
#define NOTE_FSHARP 370
#define NOTE_G 	392
#define NOTE_GSHARP 415
#define NOTE_A 	440
#define NOTE_ASHARP 466
#define NOTE_B		494

int main()
	{	
	Beep(NOTE_C * 2, 		500);
	Beep(NOTE_G, 			750);
	Beep(NOTE_C * 2, 		250);
	Beep(NOTE_C * 2, 		125);
	Beep(NOTE_D * 2, 		125);
	Beep(NOTE_E * 2, 		125);
	Beep(NOTE_F * 2, 		125);
	Beep(NOTE_G * 2, 		1250);
	Beep(NOTE_G * 2, 		250); 
	Beep(NOTE_G * 2, 		250); 
	Beep(NOTE_GSHARP * 2, 	125); 
	Beep(NOTE_ASHARP * 2, 	125); 
	Beep(NOTE_C * 3, 		1250); 
	Beep(NOTE_C * 3, 		250); 
	Beep(NOTE_C * 3, 		250); 
	Beep(NOTE_ASHARP * 2, 	125); 
	Beep(NOTE_GSHARP * 2, 	125); 
	Beep(NOTE_ASHARP * 2, 	375); 
	Beep(NOTE_GSHARP * 2, 	125); 
	Beep(NOTE_G * 2,		750); 
	return 0;
	}
