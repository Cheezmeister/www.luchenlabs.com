---
title:Extension methods don't like structs
date:Aug 23, 2010
author:Cheezmeister
tags:Coding
---

## How Not to Use C# Extension Methods ##

Earlier today, I found myself needing to scale a rectangle. 
It's a simple enough task, so I didn't want to litter the surrounding code
with all of the details of the arithmetic. I thought, "what a wonderful 
opportunity to avail myself of those nifty extension methods!"

So I wrote the following snippet:

    public static Rectangle Scale(this Rectangle rect, double xScale, double yScale, short horizontalAlign, short verticalAlign)
    {
        Point center = rect.Center;
        int right = rect.Right;
        int bottom = rect.Bottom;
       
        double width = (double)rect.Width * xScale;
        double height = (double)rect.Height * yScale;
       
        rect.Width = (int)width;
        rect.Height = (int)height;
       
        if (horizontalAlign == 0)
            rect.X += (right - rect.Right) / 2;
        else if (horizontalAlign > 0)
            rect.X += (right - rect.Right);
       
        if (verticalAlign == 0)
            rect.Y += (bottom - rect.Bottom) / 2;
        else if (verticalAlign > 0)
            rect.Y += (bottom - rect.Bottom) / 2;
    }

Great, it even lets me choose how I want it to come out aligned, 
if I so choose (and I did). 
Now whenever I need to scale something, I can just call it on the 
rectangle in question, like so:

    if (ratio > 1)
         dest.Scale(1 / ratio, 1 / ratio, -1, -1);
		 
