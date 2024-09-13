<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class AssignCustomerRoleToAllUsers extends Command
{
    protected $signature = 'assign:customer-role';

    protected $description = 'Assign the customer role to all existing users';

    public function handle()
    {
        // Find all users in the database
        $users = User::all();

        // Loop through each user and assign the "customer" role
        foreach ($users as $user) {
            // Ensure the role exists in the system
            if (!$user->hasRole('customer')) {
                $user->assignRole('customer');
                $this->info('Assigned customer role to user: ' . $user->email);
            } else {
                $this->info('User already has customer role: ' . $user->email);
            }
        }

        $this->info('Customer role assignment complete.');
    }
}
