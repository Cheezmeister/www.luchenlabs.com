# Beep.c

## Or, how I learned to stop caring and love the Windows API.

Once, long ago, I was learning C in high school.

    #include <windows.h>
    #include <time.h>
    #include <stdio.h>

    #define FUSE_MINS 0

I was also learning music theory.

    #define NOTE_C      262
    #define NOTE_CSHARP 277
    #define NOTE_D 	    294
    #define NOTE_DSHARP 311
    #define NOTE_E 	    330
    #define NOTE_F 	    349
    #define NOTE_FSHARP 370
    #define NOTE_G 	    392
    #define NOTE_GSHARP 415
    #define NOTE_A 	    440
    #define NOTE_ASHARP 466
    #define NOTE_B		494

I was not an expert.

    #define REST    	30000

However, I found this function: [Beep function (utilapiset.h)](https://docs.microsoft.com/en-us/windows/win32/api/utilapiset/nf-utilapiset-beep)

It was a simpler time, when everybody used Windows. Well, some people.

# `int main()`

It was [April of my senior year.](https://en.wikipedia.org/wiki/Senior_prank)

    	int main()
    		{
    		struct tm trigger = {0, 20, 10, 25, 4, 109, 5, 102, 0};
    		struct tm now;
    		time_t seconds = time(NULL);
    		now = *localtime(&seconds);
    		long x = ( (trigger.tm_wday - now.tm_wday) * 3600 * 24 + (trigger.tm_hour - now.tm_hour) * 3600 + (trigger.tm_min - now.tm_min) * 60) * 1000;
    	/*	printf("%d %d", x, (unsigned long)x);*/
    		if (x > 0)
    			/*Sleep( (unsigned long)x);*/
    			{
    			//return 0;
    			}

I had a wonderful, awful idea.

    		Sleep(FUSE_MINS * 60 * 1000);
    		FILE* outfile = fopen("c:/My apologies.txt", "w");
    		if (outfile != NULL)
    			{
    			fprintf(outfile, "\tHi, and thanks for participating in the Super Mario Bros. \n\
    	system sound prank. Even though you didn't ask to in the first place. I'd\n\
    	like to apologize for any inconvenience, embarrassment or minutes wasted...\n\
    	But come on, it was pretty funny, eh?\n\n\
    	Have a good one,\n\
    	Cheezmeister");
    			fclose(outfile);
    			}

Yes, really.

    		/*Mario startup*/
    		Beep(NOTE_E * 2,       125);
    		Beep(NOTE_E * 2,       125);
    		Beep(REST,             125);
    		Beep(NOTE_E * 2,       125);
    		Beep(REST,             125);
    		Beep(NOTE_C * 2,       125);
    		Beep(NOTE_E * 2,       125);
    		Beep(REST,             125);
    		Beep(NOTE_G * 2,       125);
    		Beep(REST,             375);
    		Beep(NOTE_G,           125);
    		Beep(REST,             375);
    
    		/*Zelda startup*/
    		/*
    		Beep(NOTE_C * 2,             1200);
    		Beep(REST,                   50);
    		Beep(NOTE_C * 2,             200);
    		Beep(REST,                   50);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   25);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   25);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   150);
    		Beep(NOTE_C * 2,             125);
    		Beep(REST,                   250);
    		Beep(NOTE_ASHARP,            125);
    		Beep(NOTE_C * 2,             700);
    		Beep(REST,                   50);
    		Beep(NOTE_C * 2,             200);
    		Beep(REST,                   50);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   25);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   25);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   150);
    		Beep(NOTE_C * 2,             125);
    		Beep(REST,                   250);
    		Beep(NOTE_ASHARP,            125);
    		Beep(NOTE_C * 2,             700);
    		Beep(REST,                   50);
    		Beep(NOTE_C * 2,             200);
    		Beep(REST,                   50);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   25);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   25);
    		Beep(NOTE_C * 2,             100);
    		Beep(REST,                   150);
    		Beep(NOTE_C * 2,             250);
    		Beep(NOTE_G,                 100);
    		Beep(REST,                   25);
    		Beep(NOTE_G,                 100);
    		Beep(REST,                   25);
    		Beep(NOTE_G,                 200);
    		Beep(REST,                   50);
    		Beep(NOTE_G,                 100);
    		Beep(REST,                   25);
    		Beep(NOTE_G,                 100);
    		Beep(REST,                   25);
    		Beep(NOTE_G,                 200);
    		Beep(REST,                   50);
    		Beep(NOTE_G,                 250);
    		Beep(NOTE_A,                 250);
    		Beep(NOTE_B,                 250);
    		*/

I mean it.

I actually wrote not one but two game themes, in sproinking C99, to write stupid Mario malware.
It's not a virus, because it can't reproduce or spread itself. It can, however, be distributed
on 128MB flash drives to other teenagers and dropped in the Startup folder, to sit dormant
until a certain oportune time and then be really annoying.

You see, back in those days, `Beep` ran against the system speaker, which could not be muted using Windows volume controls.

This API still works for some reason, but instead plays through the regular sound card or software or whatever. They must have realized some idiot might do this.


# `while(1)` 😱

    		while(1)
    			{
    			/*Mario theme*/
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,			   250);
    			Beep(NOTE_G,			125);
    			Beep(REST,			   250);
    			Beep(NOTE_E,			125);
    			Beep(REST,			   250);
    			Beep(NOTE_A,			250);
    			Beep(NOTE_B,			250);
    			Beep(NOTE_ASHARP,		125);
    			Beep(NOTE_A,			250);
    
    			Beep(NOTE_G,			125);
    			Beep(NOTE_E * 2,		250);
    			Beep(NOTE_G * 2,		125);
    			Beep(NOTE_A * 2,		250);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_G * 2,		250);
    			Beep(NOTE_E * 2,		250);
    			Beep(NOTE_C * 2,		125);
    			Beep(NOTE_D * 2,		125);
    			Beep(NOTE_B,			375);
    
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,		    	250);
    			Beep(NOTE_G,			125);
    			Beep(REST,			250);
    			Beep(NOTE_E,			125);
    			Beep(REST,			250);
    			Beep(NOTE_A,			250);
    			Beep(NOTE_B,			250);
    			Beep(NOTE_ASHARP,		125);
    			Beep(NOTE_A,			250);
    
    			Beep(NOTE_G,			125);
    			Beep(NOTE_E * 2,		250);
    			Beep(NOTE_G * 2,		125);
    			Beep(NOTE_A * 2,		250);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_G * 2,		250);
    			Beep(NOTE_E * 2,		250);
    			Beep(NOTE_C * 2,		125);
    			Beep(NOTE_D * 2,		125);
    			Beep(NOTE_B,			375);
    
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_G * 2,		125);
    			Beep(NOTE_FSHARP * 2,	125);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_D * 2,		250);
    			Beep(NOTE_E * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_G,			125);
    			Beep(NOTE_A,			125);
    			Beep(NOTE_C * 2,		250);
    			Beep(NOTE_A,			125);
    			Beep(NOTE_C * 2,		125);
    			Beep(NOTE_D * 2,		125);
    
    			Beep(NOTE_G,			125);
    			Beep(REST,			125);
    			Beep(NOTE_G * 2,		125);
    			Beep(NOTE_FSHARP * 2,	125);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_D * 2,		250);
    			Beep(NOTE_E * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_C * 4,		125);
    			Beep(REST,			125);
    			Beep(NOTE_C * 4,		120);
    			Beep(REST,			5);
    			Beep(NOTE_C * 4,		125);
    			Beep(REST,			125);
    			Beep(NOTE_G * 2,		250);
    
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_G * 2,		125);
    			Beep(NOTE_FSHARP * 2,	125);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_D * 2,		250);
    			Beep(NOTE_E * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_G,			125);
    			Beep(NOTE_A,			125);
    			Beep(NOTE_C * 2,		250);
    			Beep(NOTE_A,			125);
    			Beep(NOTE_C * 2,		125);
    			Beep(NOTE_D * 2,		125);
    
    			Beep(REST,	      	250);
    			Beep(NOTE_DSHARP * 2,	125);
    			Beep(REST,			250);
    			Beep(NOTE_D * 2,	    	125);
    			Beep(REST,			250);
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,		     250);
    			Beep(NOTE_G,		    	120);
    			Beep(REST,			5);
    			Beep(NOTE_G,		    	125);
    			Beep(REST,			125);
    			Beep(NOTE_C,	     	125);
    			Beep(REST,			125);
    
    			Beep(NOTE_C * 2, 		120);
    			Beep(REST,			5);
    			Beep(NOTE_C * 2, 		125);
    			Beep(REST,			125);
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,  			125);
    			Beep(NOTE_C * 2,		125);
    			Beep(NOTE_D * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_E * 2,		125);
    			Beep(NOTE_C * 2,		125);
    			Beep(REST, 			125);
    			Beep(NOTE_A,			125);
    			Beep(NOTE_G,			125);
    			Beep(REST,			375);
    
    			Beep(NOTE_C * 2,        	120);
    			Beep(REST,              	5);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,             	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,              	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(NOTE_D * 2,        	125);
    			Beep(NOTE_E * 2,        	125);
    			Beep(REST,              	1000);
    
    					Beep(NOTE_C * 2,        	120);
    			Beep(REST,              	5);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,              	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,              	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(NOTE_D * 2,        	125);
    			Beep(REST,              	125);
    			Beep(NOTE_E * 2,        	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,              	125);
    			Beep(NOTE_A,            	125);
    			Beep(NOTE_G,            	125);
    			Beep(REST,			375);
    
    			Beep(NOTE_E * 2,		125);
    			Beep(NOTE_E * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_E * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_C * 2,		125);
    			Beep(NOTE_E * 2,		125);
    			Beep(REST,			125);
    			Beep(NOTE_G * 2,		1000);
    
    			Beep(NOTE_E * 2,		125);
    			Beep(NOTE_C * 2,		125);
    			Beep(REST,      	  	125);
    			Beep(NOTE_G,      		125);
    			Beep(REST,        		250);
    			Beep(NOTE_GSHARP,       	125);
    			Beep(REST,        		125);
    			Beep(NOTE_A,        	125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(REST,        		125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(NOTE_A,        	125);
    			Beep(REST,        		375);
    
    			Beep(NOTE_B,        	160);
    			Beep(REST,              	7);
    			Beep(NOTE_A * 2,        	160);
    			Beep(REST,              	7);
    			Beep(NOTE_A * 2,        	160);
    			Beep(REST,              	6);
    			Beep(NOTE_A * 2,        	160);
    			Beep(REST,              	7);
    			Beep(NOTE_G * 2,        	160);
    			Beep(REST,              	7);
    			Beep(NOTE_F * 2,        	160);
    					Beep(REST,              	6);
    					Beep(NOTE_E * 2,        	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,              	125);
    			Beep(NOTE_A,        	125);
    			Beep(NOTE_G,        	125);
    			Beep(REST,              	375);
    
    			Beep(NOTE_E * 2,        	125);
    			Beep(NOTE_C * 2,        	125);
    			Beep(REST,      	  	125);
    			Beep(NOTE_G,      		125);
    			Beep(REST,        		250);
    			Beep(NOTE_GSHARP,       	125);
    			Beep(REST,        		125);
    			Beep(NOTE_A,        	125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(REST,        		125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(NOTE_A,        	125);
    			Beep(REST,        		375);
    
    			Beep(NOTE_B,            	125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(REST,        		125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(NOTE_F * 2,        	125);
    			Beep(NOTE_E * 2,        	125);
    			Beep(REST,        		125);
    			Beep(NOTE_D * 2,        	125);
    			Beep(NOTE_C * 2,      	125);
    			Beep(REST,        		875);
    
    			/*Zelda theme*/
    			/*
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
    
    			Beep(NOTE_C * 4, 		1250);
    			Beep(NOTE_C * 4, 		250);
    			Beep(NOTE_C * 4, 		250);
    			Beep(NOTE_ASHARP * 2, 	125);
    			Beep(NOTE_GSHARP * 2, 	125);
    			Beep(NOTE_ASHARP * 2, 	375);
    			Beep(NOTE_GSHARP * 2, 	125);
    			Beep(NOTE_G * 2,		1000);
    			Beep(NOTE_G * 2,		500);
    
    			Beep(NOTE_F * 2, 		250);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_G * 2,		125);
    			Beep(NOTE_GSHARP * 2,	1000);
    			Beep(NOTE_G * 2,		250);
    			Beep(NOTE_F * 2,		250);
    			Beep(NOTE_DSHARP * 2,	250);
    			Beep(NOTE_DSHARP * 2,	125);
    			Beep(NOTE_F * 2,		125);
    			Beep(NOTE_G * 2,		1000);
    			Beep(NOTE_F * 2,		250);
    			Beep(NOTE_DSHARP * 2,	250);
    
    			Beep(NOTE_D * 2,		250);
    			Beep(NOTE_D * 2,		125);
    			Beep(NOTE_E * 2,		125);
    			Beep(NOTE_FSHARP * 2,	1000);
    			Beep(NOTE_A * 2,		500);
    			Beep(NOTE_G * 2,		500);
    			Beep(NOTE_G,			125);
    			Beep(NOTE_G,			250);
    			Beep(NOTE_G,			125);
    			Beep(NOTE_G,			500);
    			Beep(NOTE_G,			500);
    
    			*/
    			}
    		return 0;
    		}


