#!/usr/bin/perl -w
#quick hack to allow CMake-generated Makefiles to build individual files with
#Code::Blocks -Cheezmeister

while (<STDIN>) 
	{
	my $line = $_; 
	print "/$1: $1\n\n" if ($line =~ /^(\w+\.o)\:/ ); 
	}
