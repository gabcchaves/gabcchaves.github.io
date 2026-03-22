# 3.2 Virtualization
Resource virtualization can be seen as a way to emulate computer architectures
by creating new layers of communication interface.
Computer systems are are usually divided that way; it starts on hardware level,
then it scales up to machine instructions, and then to the operating system,
system calls and programs APIs.

The concept of virtualization can be used in distributed systems primarily for
a matter of portability, since different components have different
architectures that need to be used. By creating different levels of
abstraction, which are considered virtual machines, it is possible to use an
intermediate level of abstraction that can be used by all the different
components of a distributed system to communicate through, without compromising
higher or lower levels of abstraction, which are needed for the inner
functioning of each component.

The main reason for virtualization in distributed system is to ensure resource
transparency, since, by emulation, the system can hide from the user the
absence of harware resources that it seems to have.
