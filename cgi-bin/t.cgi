#!/bin/perl

use strict;
use warnings;
use diagnostics;
use CGI;
use CGI::Carp 'fatalsToBrowser';
use LWP::UserAgent;

#my $t = param("t");
my $cgi = CGI->new;
my $t = $cgi->param('t');   
my $ua = new LWP::UserAgent;
$ua->agent("AgentName/0.1 " . $ua->agent);

print CGI::header();

my $req = new HTTP::Request POST => "http://ne3a.ru/?t=${t}"; 
my $res = $ua->request($req);

print $res->content;