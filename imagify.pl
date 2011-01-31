#!/usr/bin/perl -ws


my ($dir, $source, $title) = @ARGV;

unless (defined $dir) {
	print "Where?: ";
	$dir = <STDIN>;
	chomp $dir;
	print "\n";
}unless (defined $title) {
	print "Give this album a title: ";
	$title = <STDIN>;
	chomp $title;
	print "\n";
}
unless (defined $source) {
	print "Where do these come from? (droid)\n";
	$source = <STDIN>;
	chomp $source;
	print "\n";
}


# Make a different dir for html files
my $outdir = `basename $dir`;
chomp $outdir;
mkdir "$outdir", 0777 or die "Couldn't create directory $outdir\n$!\n";


my $dcomment = "_______________________NoComment________________________";
my $dtag = "_______________________NoTag___________________________";


my $listfile = "$dir/list.txt";
if (-e $listfile) {
	open LISTFILE, "<", $listfile;
	@lines = <LISTFILE>;
}
else {
	my $input = (`ls $dir | cat`);
	@lines = split(/\n/, $input);
}

# open THUMBSFILE, ">", "index.html";

for (my $i = 0; $i < @lines - 1; $i++) {
	my $line = $lines[$i];
	my $nextline = $lines[$i + 1];
	chomp $line;
	chomp $nextline;

	$line = "$line|$dtag|$dcomment" if (not -e $listfile);

	my ($file, $tag, $comment) = split(/\|/, $line);
	my ($next, $garbage, $garbage2) = split(/\|/, $nextline);


	if ($source =~ m/droid/i) {
		if ($file =~ m/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d).(\d\d).(\d\d).jpg/) {
			my ($year, $month, $day, $hour, $min, $sec) = ($1, $2, $3, $4, $5, $6);

			my $outfile = "$outdir/$file.markdown";
			print "Opening $outfile\n";
			open (OUTFILE, ">", $outfile) or die "Couldn't open $outfile for writing\n";

			print OUTFILE "---\n";
			print OUTFILE "title:$title\n";
			print OUTFILE "tag:$tag\n";
			print OUTFILE "comment:$comment\n";
			print OUTFILE "---\n\n";
			print OUTFILE "## $tag: $year/$month/$day at $hour:$min:$sec\n\n";
			print OUTFILE "\n";
			print OUTFILE "[Next]($next.html)\n\n";
			print OUTFILE "$comment\n\n";
			print OUTFILE qq(<img \nclass="photo" \ntitle="$comment" \nalt="$comment" \nsrc="\$root/content/personal/photos/$outdir/$file" \n/>\n\n);
			print OUTFILE "[Next]($next.html)\n";
			print OUTFILE "\n";
	
			close OUTFILE;
		}
		else {
			print "LOL, $line\n";
		}
	}

}

# 2010-11-27 16.41.26.jpg
