#!/bin/perl

use strict;
use warnings;
use warnings qw(FATAL utf8);
use diagnostics;
use CGI;
use URI::Escape;
use CGI::Carp 'fatalsToBrowser';
use LWP::UserAgent;

my $cgi = CGI->new;
my $t = $cgi->param('t');   
my $d = $cgi->param('d');   
my $ua = new LWP::UserAgent;
$ua->agent("AgentName/0.1 " . $ua->agent);
print CGI::header();

my $url = "http://ne3a.ru/remapper/v1?t=${t}&d=${d}";
my $req = new HTTP::Request POST => $url; 
my $res = $ua->request($req);

my $answer = $res->content;

print $answer;