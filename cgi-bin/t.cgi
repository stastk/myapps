#!/bin/perl

use strict;
use warnings;
use warnings qw(FATAL utf8);
use Scalar::Util qw(looks_like_number);

use diagnostics;
use CGI;
use URI::Escape;
use CGI::Carp 'fatalsToBrowser';
use LWP::UserAgent;

my $cgi = CGI->new;
if (looks_like_number($cgi->param('v'))) {
    my $t = $cgi->param('t');
    my $d = $cgi->param('d');
    my $v = $cgi->param('v');
    my $ua = new LWP::UserAgent;
    $ua->agent("AgentName/0.1 " . $ua->agent);
    print CGI::header();

    my $url = "http://st91.ne3a.ru/remapper/v${v}?t=${t}&d=${d}";
    my $req = new HTTP::Request POST => $url;
    my $res = $ua->request($req);

    my $answer = $res->content;

    print $answer;
} else {
    print "Secret private hacker code: #42BCED342E0344CB00240A2394809FFF26-72-24AB3C2F45";
}
