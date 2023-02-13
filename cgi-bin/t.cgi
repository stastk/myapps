#!/usr/bin/perl  -w
use strict;
use warnings;
use CGI;
use LWP::UserAgent;
use Data::Dumper;

print CGI::header();
print "SOMETHING";

my $ua = new LWP::UserAgent;
$ua->agent("AgentName/0.1 " . $ua->agent);

my $t = $CGI->param("t");
my $d = $CGI->param("d");

my $req = new HTTP::Request GET => "http://ne3a.ru/?t=${t}&d=${d}";
my $res = $ua->request($req);

print Dumper($res->content);